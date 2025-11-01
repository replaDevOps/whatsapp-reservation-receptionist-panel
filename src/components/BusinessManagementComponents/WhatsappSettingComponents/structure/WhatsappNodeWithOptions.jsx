import { Button, Card, Flex, Typography } from 'antd'
import { MyInput } from '../../../Forms'
import { Position, Handle } from 'reactflow'
import { useState } from 'react'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const { Text } = Typography
const WhatsappNodeWithOptions = ({ id, data }) => {
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(data?.value || '')

  const handleEditToggle = () => {
    if (editMode) {
      // Save the changes when turning off edit mode
      data?.onEditNode?.(id, inputValue)
    }
    setEditMode(!editMode)
  }

  const handleCancelEdit = () => {
    // Reset to original value and exit edit mode
    setInputValue(data?.value || '')
    setEditMode(false)
  }

  return (
    <div>
      <Handle type="target" position={Position.Top} />
        <Card
          className="bg-transparent-brand bg-transparent border-0 position-relative"
          title={data?.title || 'Text Message'}
        >
        <Flex gap={10} align="flex-start">
          <div className="field-area w-100">
            <Flex vertical gap={6}>
                <MyInput
                    withoutForm
                    placeholder={data?.placeholder || 'Hi !'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={!editMode}
                />
                <Button
                    type="button"
                    className="btncancel py-1 px-2 bg-white"
                >
                    <Flex align='center' className='w-100' justify='space-between' gap={5}>
                        <Text className='fs-12'>{data?.option}</Text>
                        <img src="/assets/icons/share-fork.webp" width={12} alt="share icon" fetchPriority="high" />
                    </Flex>
                </Button>
            </Flex>
          </div>
          <Flex vertical gap={10} justify="space-between" className="node-actions">
            {/* Add new node */}
            <Button
              type="button"
              className="h-auto p-0 bg-transparent border-0"
              onClick={() => data?.setAddListNode(true)}
            >
              <img src="/assets/icons/add.webp" width={12} alt='add icon' fetchPriority="high" />
            </Button>

            {/* Edit node */}
            {editMode ? (
              <>
                <Button
                  type="button"
                  className="h-auto p-0 bg-transparent border-0"
                  onClick={handleEditToggle}
                >
                  <CheckOutlined className='fs-12 text-brand' />
                </Button>
                <Button
                  type="button"
                  className="h-auto p-0 bg-transparent border-0"
                  onClick={handleCancelEdit}
                >
                  <CloseOutlined className='fs-12 text-brand' />
                </Button>
              </>
            ) : (
              <Button
                type="button"
                className="h-auto p-0 bg-transparent border-0"
                onClick={handleEditToggle}
              >
                <img src="/assets/icons/edit-pen.webp" width={12} alt='edit icon' fetchPriority="high" />
              </Button>
            )}
            
            {/* Delete node */}
            <Button
              type="button"
              className="h-auto p-0 bg-transparent border-0"
              onClick={() => data?.onDeleteNode?.(id)}
            >
              <img src="/assets/icons/bin.webp" width={12} alt='bin icon' fetchPriority="high" />
            </Button>
          </Flex>
        </Flex>
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export {WhatsappNodeWithOptions}