export function isEmptyO(obj) {
  return !!Object.keys(obj).length
}

export function stringToImageArray(str) {
  // 使用逗号分隔字符串并去除首尾空格，得到图片链接数组
  const urls = str.split(',').map(url => url.trim());
  // console.log(urls);
  // 返回图片链接数组
  return urls;
}

