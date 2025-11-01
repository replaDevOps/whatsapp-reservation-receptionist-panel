import { Button, Card, Flex } from 'antd'
import { MyInput } from '../../../Forms'
import { Position, Handle } from 'reactflow'
import { useState } from 'react'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const WhatsappNode = ({ id, data }) => {
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
            <MyInput
              withoutForm
              placeholder={data?.placeholder || 'Hi !'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={!editMode}
            />
          </div>
          <Flex vertical gap={10} justify="space-between" className="node-actions">
            {/* Add new node */}
            <Button
              type="button"
              className="h-auto p-0 bg-transparent border-0"
              onClick={() => data?.onAddNode?.(id)}
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

export {WhatsappNode}