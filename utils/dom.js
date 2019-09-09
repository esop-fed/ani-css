/**
 * 通过html字符串模板创建DOM
 * @param {string} htmlTemplateString html template string： html字符串
 * @returns {DocumentFragment} 返回文档片段
 */
export const createFragmentByTemplateString = htmlTemplateString => {
    const template = document.createElement('template');

    template.innerHTML = htmlTemplateString;

    return template.content;
};
