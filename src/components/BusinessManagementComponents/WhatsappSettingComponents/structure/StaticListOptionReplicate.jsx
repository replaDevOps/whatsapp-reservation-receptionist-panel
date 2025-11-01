import { Row, Col, Form, Space, Flex, Image, Button, Typography } from "antd";
import { MyDatepicker, MyInput, MySelect } from "../../../Forms";
import { ModuleTopHeading } from "../../../PageComponent";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

const { Text } = Typography
const StaticListOptionReplicate = ({
  dayKey,
  title,
  form,
  fieldsConfig = [],
  showInputIndex = false,
  children,
}) => {
  // Initialize DnD sensor
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // Handle drag and drop reordering
  const handleDragEnd = (event, fields, move) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((f) => f.key === active.id);
    const newIndex = fields.findIndex((f) => f.key === over.id);
    if (oldIndex !== -1 && newIndex !== -1) move(oldIndex, newIndex);
  };

  // A single row (sortable)
  const SortableRow = ({ field, index, remove, add }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
      useSortable({ id: field.key });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Row
          gutter={[16, 0]}
          align="middle"
          className="mb-1 bg-light-white p-2 rounded-8 mb-2 cursor-grab"
        >
          <Col span={2}>
            <Flex justify="end" className="mt-2">
              <Image src="/assets/icons/drag.webp" width={20} preview={false} alt='drag icon' fetchPriority="high" />
            </Flex>
          </Col>

          {/* Generate fields based on config */}
          {fieldsConfig.map((f, findex) => (
            <Col key={findex} xs={20} sm={20} md={20} lg={f.col || 6}>
              {f.type === "input" && (
                <MyInput
                  label={showInputIndex ? `${f.label} ${index + 1}` : f.label}
                  name={[field.name, f.name]}
                  placeholder={f.placeholder}
                  required={f.required}
                  message={f.message}
                />
              )}
              {f.type === "select" && (
                <MySelect
                  label={showInputIndex ? `${f.label} ${index + 1}` : f.label}
                  name={[field.name, f.name]}
                  placeholder={f.placeholder}
                  required={f.required}
                  message={f.message}
                  options={f.options || []}
                />
              )}
              {f.type === "textarea" && (
                <MyInput
                  textArea
                  label={showInputIndex ? `${f.label} ${index + 1}` : f.label}
                  name={[field.name, f.name]}
                  placeholder={f.placeholder}
                  required={f.required}
                  message={f.message}
                />
              )}
              {f.type === "date" && (
                <MyDatepicker
                  datePicker
                  label={showInputIndex ? `${f.label} ${index + 1}` : f.label}
                  name={[field.name, f.name]}
                  placeholder={f.placeholder}
                  required={f.required}
                  message={f.message}
                />
              )}
              {f.type === "time" && (
                <MyDatepicker
                  label={showInputIndex ? `${f.label} ${index + 1}` : f.label}
                  name={[field.name, f.name]}
                  placeholder={f.placeholder}
                  required={f.required}
                  message={f.message}
                />
              )}
              {f.type === "multiplechoice" && (
                <Flex vertical gap={0} className="p-2 bg-light-white rounded-8 w-100">
                  <MyInput
                    label={showInputIndex ? `${f.label} ${index + 1}` : f.label}
                    name={[field.name, f.name, "question"]}
                    placeholder={f.placeholder}
                    required
                    message={f.message}
                  />
                  <Form.List name={[field.name, f.name, "options"]} className='w-100'>
                    {(innerFields, { add: addInner, remove: removeInner }) => (
                      <Flex vertical gap={6} className="w-100">
                        {innerFields.map((innerField, idx) => (
                          <Row gutter={[12,0]} key={innerField.key} className="w-100" align={"middle"}>
                            <Col span={22}>
                              <MyInput
                                label={`Option ${idx + 1}`} 
                                name={[innerField.name, "option"]}
                                placeholder={`Enter title ${idx + 1}`}
                              />
                            </Col>
                            <Col span={2}>
                              <MinusCircleOutlined
                                className="fs-16 text-red cursor-pointer mt-3"
                                onClick={() => removeInner(innerField.name)}
                              />
                            </Col>
                          </Row>
                        ))}
                        <Button
                          type="button"
                          className="btncancel w-100 px-3 justify-start"
                          onClick={() => addInner({ option: "" })}
                        >
                          <Flex align="center" justify="center" className="w-100" gap={5}>
                            <PlusCircleOutlined />
                            <Text>Add Option</Text>
                          </Flex>
                        </Button>
                      </Flex>
                    )}
                  </Form.List>
                </Flex>
              )}
            </Col>
          ))}

          <Col span={2}>
            <Flex justify="end" className="mt-2">
              <Image
                src="/assets/icons/delete.webp"
                width={20}
                preview={false}
                onClick={() => remove(field.name)}
                className="cursor"
                alt='delete icon' fetchPriority="high"
              />
            </Flex>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <Form.List name={dayKey}>
      {(fields, { add, remove, move }) => (
        <Space direction="vertical" className="w-100">
          <Row gutter={[16, 16]} align="middle">
            {/* Add Button or Title */}
            <Col span={24}>
              {title ? (
                <ModuleTopHeading
                  level={5}
                  name={title}
                  onClick={() => {
                    const newItem = {};
                    fieldsConfig.forEach((f) => (newItem[f.name] = null));
                    add(newItem);
                  }}
                  shape="round"
                />
              ) : (
                <Button
                  type="button"
                  className="btncancel w-100 px-3 justify-start"
                  onClick={() => {
                    const newItem = {};
                    fieldsConfig.forEach((f) => (newItem[f.name] = null));
                    add(newItem);
                  }}
                >
                  {children || "Add Field"}
                </Button>
              )}
            </Col>

            {/* Sortable Fields */}
            {fields.length > 0 && (
              <Col span={24}>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEnd(event, fields, move)}
                >
                  <SortableContext
                    items={fields.map((f) => f.key)}
                    strategy={verticalListSortingStrategy}
                  >
                    {fields.map((field, index) => (
                      <SortableRow
                        key={field.key}
                        field={field}
                        index={index}
                        remove={remove}
                        add={add}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </Col>
            )}
          </Row>
        </Space>
      )}
    </Form.List>
  );
};

export { StaticListOptionReplicate };
