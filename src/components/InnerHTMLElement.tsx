export const renderInnerHtml = (htmlContent: any) => (
  <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
);
