import { Button, Card, Col, Divider, Dropdown, Flex, Row, Segmented, Typography } from 'antd'
import { ModuleTopHeading } from '../../../PageComponent'
import { NavLink } from 'react-router-dom'
import { useState, useCallback } from 'react'
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { DeleteModal } from '../../../Ui'
import { AddFormFieldsDrawer, AddInertFlowDrawer, AddListOptionTextDrawer, AddMainNodesModal, AddPathModal, AddRequestDataUserDrawer, AddTextNodeDrawer, AddTextWithButtonDrawer, ChooseFormOptionsModal } from '../modal'
import { WhatsappStartNode } from './WhatsappStartNode'
import {WhatsappNode} from './WhatsappNode'
import { WhatsappNodeWithButtons } from './WhatsappNodeWithButtons'
import { WhatsappNodeWithOptions } from './WhatsappNodeWithOptions'

const nodeTypes = { 
    textUpdater: WhatsappStartNode,
    whatsappNode: WhatsappNode, 
    whatsappnodewithbutton: WhatsappNodeWithButtons,
    WhatsappNodeWithOptions: WhatsappNodeWithOptions,
}

const { Title, Text } = Typography
const WhatsappSettingPanel = () => {
    const [activeTab, setActiveTab] = useState('Sequence editor')
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [notification, setNotification] = useState({ show: false, message: '', type: '' })
    const [ addpath, setAddPath ] = useState(false)
    const [ editpath, setEditPath ] = useState(null)
    const [ deletepath, setDeletePath ] = useState(false)
    const [ addnodeentity, setAddNodeEntity ] = useState(false)
    const [ addtextnode, setAddTextNode ] = useState(false)
    const [ addlistnode, setAddListNode ] = useState(false)
    const [ addtextbutton, setAddTextButton ] = useState(false)
    const [ addrequestuser, setAddRequestUser ] = useState(false)
    const [ insertflow, setInsertFlow ] = useState(false)
    const [ addformfield, setAddFormField ] = useState(false)
    const [ chooseformfield, setChooseFormField ] = useState(false)

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type })
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' })
        }, 3000)
    }

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

    const initialNodes = [
        {
            id: 'node-1',
            type: 'textUpdater',
            position: { x: 0, y: 0 },
            data: { 
                title: 'Start', 
                onMoreNode: () => setAddNodeEntity(true),
                addnodeentity: addnodeentity
            },
        },
        {
            id: 'node-2',
            type: 'whatsappNode',
            position: { x: 50, y: 100 },
            data: { 
                title: 'Text Message area', 
                value: 'Hello there 👋', 
                placeholder: 'Type your message...' 
                
            },
        },
        {
            id: 'node-3',
            type: 'whatsappnodewithbutton',
            position: { x: 100, y: 200 },
            data: { 
                title: 'Text Message with Buttons', 
                value: 'Choose your language.', 
                placeholder: 'Choose your language...',
                langone: 'English',
                langtwo: 'Arabic',
                setAddTextButton: ()=> setAddTextButton(true)
            },
        },

        {
            id: 'node-4',
            type: 'WhatsappNodeWithOptions',
            position: { x: -200, y: 300 },
            data: { 
                title: 'Text Message with Options', 
                value: 'Choose your branch.', 
                placeholder: 'Choose your language...',
                option: '[Branches]',
                setAddListNode: ()=> setAddListNode(true)
            },
        },
    ]

    useState(()=>{
        setNodes(initialNodes)
    },[])



  // Function to handle editing a node
  const handleEditNode = useCallback((nodeId, newValue) => {
        setNodes((nds) =>
        nds.map((node) => {
            if (node.id === nodeId) {
                return {
                    ...node,
                    data: {
                    ...node.data,
                    value: newValue
                    }
                }
            }
            return node
            })
        )
        showNotification('Node updated successfully!', 'success')
    }, [])

    // Function to handle deleting a node
    const handleDeleteNode = useCallback((nodeId) => {
        if (nodes.length <= 1) {
            showNotification('Cannot delete the last node', 'warning')
            return
        }

        setNodes((nds) => nds.filter((node) => node.id !== nodeId))
    
        // Also remove any edges connected to this node
        setEdges((eds) => eds.filter(
            (edge) => edge.source !== nodeId && edge.target !== nodeId
        ))
            
        showNotification('Node deleted successfully!', 'success')
    }, [nodes.length])

    // Initialize nodes with the callback functions
    const initializedNodes = nodes.map(node => ({
        ...node,
        data: {
            ...node.data,
            onAddNode: setAddTextNode,
            onEditNode: handleEditNode,
            onDeleteNode: handleDeleteNode
        }
    }))

    const options = [
        {
        label: (
            <Flex align="center" gap={10}>
            <img
                src={
                activeTab === "Sequence editor"
                    ? "/assets/icons/black-seq.webp"
                    : "/assets/icons/gray-seq.webp"
                }
                alt="sequence"
                fetchPriority="high"
                width={16}
            />
            Sequence editor
            </Flex>
        ),
        value: "Sequence editor",
        },
        {
        label: (
            <Flex align="center" gap={10}>
            <img
                src={
                activeTab === "Mobile View"
                    ? "/assets/icons/black-mb.webp"
                    : "/assets/icons/gray-mb.webp"
                }
                alt="mobile"
                fetchPriority="high"
                width={16}
            />
            Mobile View
            </Flex>
        ),
        value: "Mobile View",
        },
    ]

    const [pathData, setPathData] = useState([
        { id: 1, name: 'Path 1' },
        { id: 2, name: 'Path 2' },
        { id: 3, name: 'Path 3' },
    ]);

    const deleteItem = () => {
        setPathData((prevData) => prevData.filter((item) => item.id !== deletepath));
        setDeletePath('')
    }

    return (
        <>
            <Card className='radius-12 card-cs border-gray h-100 position-relative'>
                {/* Custom Notification */}
                {notification?.show}
                <Flex vertical gap={10}>
                    <Flex align='center' justify='space-between' gap={10}>
                        <Flex vertical>
                                <ModuleTopHeading level={4} name='WhatsApp Settings' />
                                <Text className='text-gray fs-13'>Connect your WhatsApp to your business</Text>
                        </Flex>
                        <Flex gap={5} align='center'>
                            <Button type='button' className='btncancel text-black border-gray'> 
                                Cancel
                            </Button>
                            <Button type="primary" className='btnsave border0 text-white brand-bg'> 
                                Save
                            </Button>
                        </Flex>
                    </Flex>
                    <Card className='radius-8 card-cs border-gray h-100 bg-whats'>
                        <div className='segment-cs mb-2'>
                            <Flex gap={10} wrap justify='end'> 
                                <Segmented
                                    className='custom-segment'
                                    options={options}
                                    value={activeTab}
                                    onChange={(val) => setActiveTab(val)}
                                /> 
                            </Flex>
                        </div>
                        <div style={{ display: activeTab === 'Sequence editor' ? 'block' : 'none' }}>
                            <Row gutter={[24,24]}>
                                <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 8}} xl={{span: 7}}>    
                                    <div className='bg-white bg-sider-whats'>
                                        <Flex vertical gap={10}>
                                            <Flex vertical gap={5}>
                                                <ModuleTopHeading level={5} name={'Paths'} onClick={()=>{setAddPath(true)}} />
                                                <Text className='fs-13 text-gray'>
                                                    Create new flow or use the predefined flows.
                                                </Text>
                                            </Flex>
                                            <Flex vertical>
                                                {pathData?.map((items,index) =>
                                                <Flex key={index} justify='space-between' align='center' className='hover-effect-dropdown'>
                                                    <Text>{items?.name}</Text>
                                                    <Dropdown
                                                        menu={{
                                                            items: [
                                                                { label: <NavLink className='fs-12' onClick={(e) => {
                                                                    e.preventDefault();setAddPath(true);setEditPath({name:items?.name,id:items?.id})
                                                                }}>Edit</NavLink>, key: '1' },
                                                                { label: <NavLink className='fs-12' onClick={(e) => {
                                                                    e.preventDefault(); setDeletePath(items?.id);
                                                                }}>Delete</NavLink>, key: '2' },
                                                            ],
                                                        }}
                                                    trigger={['click']}
                                                    className='drodpown-h'
                                                    >
                                                        <Button className="bg-transparent border-0 p-0">
                                                            <img src="/assets/icons/dots.webp" alt='dots icon' fetchPriority="high" width={16} />
                                                        </Button>
                                                    </Dropdown>
                                                </Flex>
                                                )}
                                            </Flex>
                                            <Divider className='m-0 bg-divider' />
                                            <Flex vertical gap={8}>
                                                <Title level={5} className='m-0'>Predefined Flows</Title>
                                                <Flex vertical gap={5} align='flex-start'>
                                                    {[
                                                        'Google Link',
                                                        'Error Message',
                                                        'Save to Calendar',
                                                        'Reminder',
                                                        'Rescheduling',
                                                        'Talk to Receptionist',
                                                        'New Customer Instructions',
                                                    ]?.map((prelist,index) =>
                                                        <Button key={index} className='border-0 bg-transparent'>{prelist}</Button>
                                                    )}
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </div>
                                </Col>
                                <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 16}} xl={{span: 17}}>
                                    <div className='radius-8 bg-white w-100 min-height-100'>
                                        <ReactFlow
                                            nodes={initializedNodes}
                                            edges={edges}
                                            nodeTypes={nodeTypes}
                                            onNodesChange={onNodesChange}
                                            onEdgesChange={onEdgesChange}
                                            onConnect={onConnect}
                                            fitView
                                        >
                                            <Controls  />
                                            <Background color="#000" gap={16} />
                                        </ReactFlow>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Flex>
            </Card>

            <AddPathModal 
                visible={addpath}
                edititem={editpath}
                pathData = {pathData}
                setPathData={setPathData}
                onClose={()=>{setAddPath(false);setEditPath(null)}}
            />
            <DeleteModal 
                visible={deletepath}
                onConfirm={deleteItem}
                title={'Are you sure?'}
                subtitle={'This action cannot be undone. Deleting this path may affect system flow.'}
                onClose={()=>setDeletePath(false)}
            />

            <AddMainNodesModal 
                visible={addnodeentity}
                setAddTextNode={setAddTextNode}
                setAddListNode={setAddListNode}
                setAddTextButton={setAddTextButton}
                setAddRequestUser={setAddRequestUser}
                setInsertFlow={setInsertFlow}
                setAddFormField={setAddFormField}
                onClose={()=>setAddNodeEntity(false)}
            /> 

            <AddTextNodeDrawer 
                visible={addtextnode}
                onClose={()=>setAddTextNode(false)}
            />

            <AddListOptionTextDrawer 
                visible={addlistnode}
                onClose={()=>setAddListNode(false)}
            />

            <AddTextWithButtonDrawer 
                visible={addtextbutton}
                onClose={()=>setAddTextButton(false)}
            />

            <AddRequestDataUserDrawer 
                visible={addrequestuser}
                onClose={()=>setAddRequestUser(false)}
            />

            <AddInertFlowDrawer 
                visible={insertflow}
                onClose={()=>setInsertFlow(false)}
            />

            <AddFormFieldsDrawer 
                visible={addformfield}
                setChooseFormField={setChooseFormField}
                onClose={()=>setAddFormField(false)}
            />
        </>
    )
}

export { WhatsappSettingPanel }