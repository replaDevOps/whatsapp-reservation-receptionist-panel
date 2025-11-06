import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Flex, Select, Pagination } from 'antd';
import { useTranslation } from 'react-i18next';
const CustomPagination = ({
  total,
  pageSize,
  current,
  onPageChange,
  pageSizeOptions = [10, 20, 50, 100],
}) => {
  const {t, i18n} = useTranslation();
    const isArabic = i18n.language === "ar";
  if (!total || total <= pageSize) return null;

  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a className='text-black'>{isArabic ? <RightOutlined /> : <LeftOutlined />} {t("Previous")}</a>;
    }
    if (type === 'next') {
      return <a className='text-black'>{t('Next')} {isArabic ? <LeftOutlined /> : <RightOutlined />}</a>;
    }
    return originalElement;
  };

  return (
    <Flex justify="space-between" align="center" className="px-2 py-4">
      <Flex align="center" gap={8}>
        <span className="text-gray-500">{t('Rows per page')}:</span>
        <Select
          value={pageSize}
          onChange={(value) => onPageChange(1, value)}
          options={pageSizeOptions.map((size) => ({
            value: size,
            label: size.toString(),
          }))}
          className="filter-pag w-80"
        />
      </Flex>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onPageChange}
        showLessItems
        className="pagination"
        itemRender={itemRender}
      />
    </Flex>
  );
};

export { CustomPagination };
