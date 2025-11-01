import { Button, Card, Flex, Typography } from 'antd'
import { Position, Handle } from 'reactflow'

const { Text } = Typography

const WhatsappStartNode = ({ id,data }) => {
    return (
        <div className="position-relative">
            <Card className="bg-transparent-brand bg-transparent border-0 position-relative">
                <Flex gap={10} align="flex-start" justify="space-between">
                    <div className="field-area w-100 text-center position-relative radius-8">
                        <Text>{data?.title}</Text>

                        {/* Centered handle */}
                        <Handle
                            type="source"
                            position={Position.Bottom}
                            className="center-handle"
                        />
                    </div>

                    <Flex vertical gap={10} justify="space-between" className="node-actions">
                        <Button
                            type="button"
                            className="h-auto p-0 bg-transparent border-0"
                            onClick={data?.onMoreNode}
                        >
                            <img src={
                                // data?.addnodeentity.length > 0 ?
                                "/assets/icons/add.webp"
                                // "/assets/icons/minus.webp"
                            } width={12}  alt='add/minus icon' fetchPriority="high" />
                        </Button>
                    </Flex>
                </Flex>
            </Card>
        </div>
    )
}

export { WhatsappStartNode }
