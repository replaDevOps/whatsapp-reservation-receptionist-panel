import { Row, Col, Form, Space, Flex, Image } from "antd";
import { useEffect } from "react";
import { MyInput, MySelect } from "../../../Forms";
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

const FormDifferentFieldsOption = ({ dayKey, title, form, fieldsConfig = [], showInputIndex = false }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    const fields = form.getFieldValue(dayKey) || [];
    if (fields.length === 0) {
      const defaultItem = {};
      fieldsConfig.forEach((f) => {
        defaultItem[f.name] = null;
      });
      form.setFieldsValue({ [dayKey]: [defaultItem] });
    }
  }, [dayKey, form, fieldsConfig]);

  const handleDragEnd = (event, fields, move) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((field) => field.key === active.id);
    const newIndex = fields.findIndex((field) => field.key === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      move(oldIndex, newIndex);
    }
  };

  const SortableRow = ({ field, index, remove }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: field.key });

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
              <Image 
                src="/assets/icons/drag.webp" 
                width={20} 
                preview={false} 
                alt='drag icon' fetchPriority="high"
              />
            </Flex>
          </Col>
          {fieldsConfig.map((f, findex) => (
            <Col key={findex} xs={20} sm={20} md={20} lg={f.col || 6}>
              {f.type === "input" ? (
                <MyInput
                  label={
                    showInputIndex
                      ? `${f.label} ${index + 1}`
                      : f.label
                  }
                  name={[field.name, f.name]}
                  placeholder={f.placeholder}
                  required={f.required}
                  message={f.message}
                  addonBefore={f.addonBefore}
                  className={f.className || ""}
                />
              ) : f.type === "select" ? (
                <MySelect
                  label={
                    showInputIndex
                      ? `${f.label} ${index + 1}`
                      : f.label
                  }
                  name={[field.name, f.name]}
                  placeholder={f.placeholder}
                  required={f.required}
                  message={f.message}
                  options={f.options || []}
                />
              ) : null}
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
            <Col span={24}>
              <ModuleTopHeading level={5} name={title} onClick={() => add()} shape="round" />
            </Col>
            <Col span={24}>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => handleDragEnd(event, fields, move)}
              >
                <SortableContext 
                  items={fields.map(f => f.key)} 
                  strategy={verticalListSortingStrategy}
                >
                  {fields.map((field, index) => (
                    <SortableRow 
                      key={field.key} 
                      field={field} 
                      index={index} 
                      remove={remove} 
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </Col>
          </Row>
        </Space>
      )}
    </Form.List>
  );
};

export { FormDifferentFieldsOption };