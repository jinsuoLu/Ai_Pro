/*!
 * vue-admin-better
 * GitHub: https://github.com/zxwk1998/vue-admin-better
 * Gitee: https://gitee.com/chu1204505056/vue-admin-better
 *
 * 版权所有 (c) 2025 vue-admin-better
 * 本项目使用 MIT 许可证
 * 构建时间: 2026-5-21 23:23:42
 */
"use strict";
(self["rspackChunkvue_admin_better"] = self["rspackChunkvue_admin_better"] || []).push([[7522], {
41: (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  batchCreateProxy: function() { return batchCreateProxy; },
  createProxy: function() { return createProxy; },
  deleteProxy: function() { return deleteProxy; },
  extendProxy: function() { return extendProxy; },
  getProxyUrl: function() { return getProxyUrl; },
  listProxies: function() { return listProxies; },
  refreshCaptcha: function() { return refreshCaptcha; },
  uploadImage: function() { return uploadImage; }
});
/* import */ var _config_net_config__rspack_import_0 = __webpack_require__(66016);
/* import */ var _config_net_config__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(_config_net_config__rspack_import_0);
/* import */ var _utils_request__rspack_import_1 = __webpack_require__(39137);


async function uploadImage(imageBase64) {
  return (0,_utils_request__rspack_import_1["default"])({
    url: '/api/image/upload',
    method: 'post',
    data: {
      imageBase64
    }
  });
}
async function createProxy(data) {
  return (0,_utils_request__rspack_import_1["default"])({
    url: '/api/proxy/create',
    method: 'post',
    data
  });
}
async function listProxies() {
  return (0,_utils_request__rspack_import_1["default"])({
    url: '/api/proxy/list',
    method: 'get'
  });
}
async function extendProxy(token, additionalMinutes) {
  return (0,_utils_request__rspack_import_1["default"])({
    url: '/api/proxy/extend',
    method: 'post',
    data: {
      token,
      additionalMinutes
    }
  });
}
async function deleteProxy(token) {
  return (0,_utils_request__rspack_import_1["default"])({
    url: '/api/proxy/' + token,
    method: 'delete'
  });
}
async function refreshCaptcha(token) {
  return (0,_utils_request__rspack_import_1["default"])({
    url: '/api/proxy/refresh-captcha',
    method: 'post',
    data: {
      token
    }
  });
}
function getProxyUrl(token) {
  return `${_config_net_config__rspack_import_0.backendServerUrl}/proxy/${token}`;
}
async function batchCreateProxy(items, imageId = '') {
  return (0,_utils_request__rspack_import_1["default"])({
    url: '/api/proxy/batch-create',
    method: 'post',
    data: {
      items,
      imageId
    }
  });
}

}),

}]);