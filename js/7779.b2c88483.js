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
(self["rspackChunkvue_admin_better"] = self["rspackChunkvue_admin_better"] || []).push([[7779], {
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
48995: (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__rspack_import_0 = __webpack_require__(31601);
/* import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__rspack_import_0);
/* import */ var _node_modules_css_loader_dist_runtime_api_js__rspack_import_1 = __webpack_require__(76314);
/* import */ var _node_modules_css_loader_dist_runtime_api_js__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__rspack_import_1);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__rspack_import_1_default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__rspack_import_0_default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.proxy-container[data-v-50d56a38] {\n  padding: 20px;\n}\n.captcha-container[data-v-50d56a38] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.captcha-tag[data-v-50d56a38] {\n  flex: 1;\n}\n.refresh-btn[data-v-50d56a38] {\n  padding: 0;\n  width: 32px;\n  height: 28px;\n}\n.text-gray[data-v-50d56a38] {\n  color: #999;\n}\n.batch-image-upload[data-v-50d56a38] {\n  display: flex;\n  align-items: center;\n}\n.image-preview-area[data-v-50d56a38] {\n  width: 120px;\n  height: 120px;\n  border: 2px dashed #dcdfe6;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  transition: border-color 0.3s;\n}\n.image-preview-area[data-v-50d56a38]:hover {\n  border-color: #409eff;\n}\n.image-preview-area .preview-image[data-v-50d56a38] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.upload-placeholder[data-v-50d56a38] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: #8c939d;\n  font-size: 12px;\n}\n.upload-placeholder i[data-v-50d56a38] {\n  font-size: 28px;\n  margin-bottom: 8px;\n}\n.upload-placeholder .tip-text[data-v-50d56a38] {\n  font-size: 11px;\n  color: #c0c4cc;\n  margin-top: 4px;\n}\n.hidden-upload[data-v-50d56a38] {\n  display: none;\n}\n.form-tip[data-v-50d56a38] {\n  color: #909399;\n  font-size: 12px;\n  margin-top: 5px;\n  display: block;\n}\n.expire-input-group[data-v-50d56a38] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.expire-input-group .el-input[data-v-50d56a38] {\n  width: 120px;\n}\n.expire-input-group .el-select[data-v-50d56a38] {\n  width: 100px;\n}\n.checkbox-label[data-v-50d56a38] {\n  display: flex;\n  align-items: center;\n  margin-top: 10px;\n  color: #606266;\n  font-size: 13px;\n}\n.checkbox-label .el-checkbox[data-v-50d56a38] {\n  margin-right: 8px;\n}\n", ""]);
// Exports
/* export default */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


}),
76269: (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__rspack_import_0 = __webpack_require__(31601);
/* import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__rspack_import_0);
/* import */ var _node_modules_css_loader_dist_runtime_api_js__rspack_import_1 = __webpack_require__(76314);
/* import */ var _node_modules_css_loader_dist_runtime_api_js__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__rspack_import_1);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__rspack_import_1_default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__rspack_import_0_default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".page-header{background:linear-gradient(135deg, #4d8af0 0%, #1a56db 100%);border-radius:12px;padding:30px;margin-bottom:24px;color:#fff;box-shadow:0 8px 32px rgba(102,126,234,.3)}.page-header .header-content{display:flex;justify-content:space-between;align-items:center}.page-header .header-content .header-left .page-title{font-size:2rem;font-weight:700;margin:0 0 8px 0;display:flex;align-items:center;gap:12px}.page-header .header-content .header-left .page-title .vab-icon{font-size:1.8rem}.page-header .header-content .header-left .page-description{font-size:1rem;opacity:.9;margin:0}.page-header .header-content .header-right{display:flex;align-items:center;gap:8px;font-size:1.1rem;font-weight:600}.page-header .header-content .header-right .vab-icon{font-size:1.3rem}", ""]);
// Exports
/* export default */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


}),
84399: (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ VabPageHeader; }
});

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/VabPageHeader/index.vue?vue&type=template&id=2b14fb2d&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page-header",class:_vm.customClass},[_c('div',{staticClass:"header-content"},[_c('div',{staticClass:"header-left"},[_c('h1',{staticClass:"page-title"},[(_vm.icon)?_c('vab-icon',{attrs:{"icon":_vm.icon}}):_vm._e(),_vm._v("\n        "+_vm._s(_vm.title)+"\n      ")],1),(_vm.description)?_c('p',{staticClass:"page-description",domProps:{"innerHTML":_vm._s(_vm.description)}}):_vm._e()]),(_vm.rightIcon || _vm.rightText)?_c('div',{staticClass:"header-right"},[_vm._t("right",function(){return [(_vm.rightIcon)?_c('vab-icon',{attrs:{"icon":_vm.rightIcon}}):_vm._e(),(_vm.rightText)?_c('span',[_vm._v(_vm._s(_vm.rightText))]):_vm._e()]})],2):_vm._e()])])}
var staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1[0].rules[0].use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/VabPageHeader/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* export default */ var VabPageHeadervue_type_script_lang_js_ = ({
  name: 'VabPageHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    icon: {
      type: Array,
      default: () => []
    },
    rightIcon: {
      type: Array,
      default: () => []
    },
    rightText: {
      type: String,
      default: ''
    },
    customClass: {
      type: String,
      default: ''
    }
  }
});
;// CONCATENATED MODULE: ./src/components/VabPageHeader/index.vue?vue&type=script&lang=js&
 /* export default */ var components_VabPageHeadervue_type_script_lang_js_ = (VabPageHeadervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(85072);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(97825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(77659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(55056);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(10540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(41113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-3[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-3[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/VabPageHeader/index.vue?vue&type=style&index=0&lang=scss&
var VabPageHeadervue_type_style_index_0_lang_scss_ = __webpack_require__(76269);
;// CONCATENATED MODULE: ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-3[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-3[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/VabPageHeader/index.vue?vue&type=style&index=0&lang=scss&

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(VabPageHeadervue_type_style_index_0_lang_scss_["default"], options);




       /* export default */ var components_VabPageHeadervue_type_style_index_0_lang_scss_ = (VabPageHeadervue_type_style_index_0_lang_scss_["default"] && VabPageHeadervue_type_style_index_0_lang_scss_["default"].locals ? VabPageHeadervue_type_style_index_0_lang_scss_["default"].locals : undefined);

;// CONCATENATED MODULE: ./src/components/VabPageHeader/index.vue?vue&type=style&index=0&lang=scss&

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(14486);
;// CONCATENATED MODULE: ./src/components/VabPageHeader/index.vue



;


/* normalize component */

var component = (0,componentNormalizer["default"])(
  components_VabPageHeadervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* export default */ var VabPageHeader = (component.exports);

}),
59006: (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ views_proxy; }
});

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/proxy/index.vue?vue&type=template&id=50d56a38&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"proxy-container"},[_c('vab-page-header',{attrs:{"description":"授权API管理，支持手机号绑定、验证码实时获取和有效期管理","icon":['fas', 'key'],"title":"授权API管理"}}),_c('vab-query-form',[_c('vab-query-form-left-panel',[_c('el-button',{attrs:{"icon":"el-icon-plus","type":"primary"},on:{"click":_vm.handleAdd}},[_vm._v("新增授权API")]),_c('el-button',{attrs:{"icon":"el-icon-files","type":"warning"},on:{"click":_vm.handleBatchAdd}},[_vm._v("批量添加")]),_c('el-button',{attrs:{"icon":"el-icon-upload2","type":"success","disabled":_vm.selectedRows.length === 0},on:{"click":_vm.handleBatchExport}},[_vm._v("\n        批量导出链接\n      ")]),_c('el-button',{attrs:{"icon":"el-icon-refresh","type":"info"},on:{"click":_vm.loadProxies}},[_vm._v("刷新列表")])],1),_c('vab-query-form-right-panel',[_c('el-form',{ref:"searchForm",attrs:{"inline":true,"model":_vm.searchForm},nativeOn:{"submit":function($event){$event.preventDefault();}}},[_c('el-form-item',[_c('el-input',{attrs:{"placeholder":"手机号","clearable":""},model:{value:(_vm.searchForm.phone),callback:function ($$v) {_vm.$set(_vm.searchForm, "phone", $$v)},expression:"searchForm.phone"}})],1),_c('el-form-item',[_c('el-input',{attrs:{"placeholder":"API连接","clearable":""},model:{value:(_vm.searchForm.apiUrl),callback:function ($$v) {_vm.$set(_vm.searchForm, "apiUrl", $$v)},expression:"searchForm.apiUrl"}})],1),_c('el-form-item',[_c('el-select',{attrs:{"placeholder":"状态"},model:{value:(_vm.searchForm.status),callback:function ($$v) {_vm.$set(_vm.searchForm, "status", $$v)},expression:"searchForm.status"}},[_c('el-option',{attrs:{"label":"全部","value":""}}),_c('el-option',{attrs:{"label":"有效","value":"active"}}),_c('el-option',{attrs:{"label":"已过期","value":"expired"}})],1)],1),_c('el-form-item',[_c('el-button',{attrs:{"icon":"el-icon-search","native-type":"submit","type":"primary"},on:{"click":_vm.handleSearch}},[_vm._v("查询")])],1)],1)],1)],1),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableLoading),expression:"tableLoading"}],ref:"proxyTable",attrs:{"data":_vm.proxyList,"element-loading-text":'加载中...'},on:{"selection-change":_vm.handleSelectionChange}},[_c('el-table-column',{attrs:{"type":"selection","width":"55"}}),_c('el-table-column',{attrs:{"label":"序号","width":"60"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v("\n        "+_vm._s((_vm.searchForm.pageNo - 1) * _vm.searchForm.pageSize + scope.$index + 1)+"\n      ")]}}])}),_c('el-table-column',{attrs:{"label":"手机号","prop":"phone","show-overflow-tooltip":"","width":"120"}}),_c('el-table-column',{attrs:{"label":"API连接","prop":"apiUrl","show-overflow-tooltip":"","min-width":"250"}}),_c('el-table-column',{attrs:{"label":"验证码","show-overflow-tooltip":"","width":"140"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var row = ref.row;
return [_c('div',{staticClass:"captcha-container"},[_c('el-tag',{staticClass:"captcha-tag",staticStyle:{"cursor":"pointer"},attrs:{"type":row.captchaCode ? 'success' : 'info'},on:{"click":function($event){row.captchaCode && _vm.copyCaptcha(row)}}},[_vm._v("\n            "+_vm._s(row.captchaCode || '暂无')+"\n          ")]),(!row.isExpired)?_c('el-button',{staticClass:"refresh-btn",attrs:{"size":"mini","icon":"el-icon-refresh","loading-text":"刷新中"},on:{"click":function($event){return _vm.refreshCaptcha(row)}}}):_vm._e()],1)]}}])}),_c('el-table-column',{attrs:{"label":"获取时间","prop":"captchaTime","show-overflow-tooltip":"","width":"160"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var row = ref.row;
return [_vm._v("\n        "+_vm._s(row.captchaTime ? _vm.formatDateTime(row.captchaTime) : '-')+"\n      ")]}}])}),_c('el-table-column',{attrs:{"label":"到期时间","prop":"expiredDate","show-overflow-tooltip":"","width":"180"}}),_c('el-table-column',{attrs:{"label":"剩余时间","show-overflow-tooltip":"","width":"120"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var row = ref.row;
return [_c('el-tag',{attrs:{"type":_vm.getTimeTagType(row.remainingTime)}},[_vm._v("\n          "+_vm._s(_vm.formatDuration(row.remainingTime))+"\n        ")])]}}])}),_c('el-table-column',{attrs:{"label":"授权链接","show-overflow-tooltip":"","min-width":"200"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var row = ref.row;
return [(!row.isExpired)?_c('el-link',{attrs:{"type":"primary","href":_vm.getProxyUrl(row.token),"target":"_blank"}},[_vm._v("\n          "+_vm._s(_vm.getProxyUrl(row.token))+"\n        ")]):_c('span',{staticClass:"text-gray"},[_vm._v("已过期")])]}}])}),_c('el-table-column',{attrs:{"label":"操作","show-overflow-tooltip":"","width":"180"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var row = ref.row;
return [_c('el-button',{attrs:{"type":"text","icon":"el-icon-copy-document","disabled":row.isExpired},on:{"click":function($event){return _vm.copyUrl(row)}}},[_vm._v("\n          复制链接\n        ")]),_c('el-button',{staticStyle:{"color":"#f56c6c"},attrs:{"type":"text","icon":"el-icon-delete"},on:{"click":function($event){return _vm.handleDelete(row)}}},[_vm._v("\n          删除\n        ")])]}}])})],1),_c('el-pagination',{attrs:{"background":true,"current-page":_vm.searchForm.pageNo,"layout":'total, sizes, prev, pager, next, jumper',"page-size":_vm.searchForm.pageSize,"total":_vm.total},on:{"current-change":_vm.handlePageChange,"size-change":_vm.handleSizeChange}}),_c('el-dialog',{attrs:{"title":"新增授权API","visible":_vm.addDialogVisible,"width":"500px"},on:{"update:visible":function($event){_vm.addDialogVisible=$event}}},[_c('el-form',{ref:"addForm",attrs:{"model":_vm.addForm,"rules":_vm.addRules,"label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"手机号","prop":"phone"}},[_c('el-input',{attrs:{"placeholder":"请输入手机号"},model:{value:(_vm.addForm.phone),callback:function ($$v) {_vm.$set(_vm.addForm, "phone", $$v)},expression:"addForm.phone"}})],1),_c('el-form-item',{attrs:{"label":"API连接","prop":"apiUrl"}},[_c('el-input',{attrs:{"placeholder":"请输入API目标URL"},model:{value:(_vm.addForm.apiUrl),callback:function ($$v) {_vm.$set(_vm.addForm, "apiUrl", $$v)},expression:"addForm.apiUrl"}})],1),_c('el-form-item',{attrs:{"label":"有效期","prop":"expireMinutes"}},[_c('el-select',{attrs:{"placeholder":"请选择有效期"},model:{value:(_vm.addForm.expireMinutes),callback:function ($$v) {_vm.$set(_vm.addForm, "expireMinutes", $$v)},expression:"addForm.expireMinutes"}},[_c('el-option',{attrs:{"label":"30分钟","value":30}}),_c('el-option',{attrs:{"label":"1小时","value":60}}),_c('el-option',{attrs:{"label":"6小时","value":360}}),_c('el-option',{attrs:{"label":"12小时","value":720}}),_c('el-option',{attrs:{"label":"1天","value":1440}}),_c('el-option',{attrs:{"label":"7天","value":10080}})],1)],1),_c('el-form-item',{attrs:{"label":"图片上传"}},[_c('div',{staticClass:"image-upload-area",on:{"click":_vm.triggerImageUpload}},[(_vm.addForm.imageUrl)?_c('img',{staticClass:"preview-image",attrs:{"src":_vm.addForm.imageUrl}}):_c('div',{staticClass:"upload-placeholder"},[_c('i',{staticClass:"el-icon-upload"}),_c('span',[_vm._v("点击上传图片")])])]),_c('input',{ref:"imageFile",staticClass:"hidden-upload",attrs:{"type":"file","accept":"image/*"},on:{"change":_vm.handleImageUpload}}),(_vm.addForm.imageUrl)?_c('el-button',{attrs:{"type":"text"},on:{"click":_vm.clearImage}},[_vm._v("清除图片")]):_vm._e()],1)],1),_c('div',{attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.addDialogVisible = false}}},[_vm._v("取消")]),_c('el-button',{attrs:{"type":"primary","loading":_vm.addLoading},on:{"click":_vm.confirmAdd}},[_vm._v("确定")])],1)],1),_c('el-dialog',{attrs:{"title":"批量添加授权API","visible":_vm.batchAddDialogVisible,"width":"650px"},on:{"update:visible":function($event){_vm.batchAddDialogVisible=$event}}},[_c('el-form',{ref:"batchAddForm",attrs:{"model":_vm.batchAddForm,"label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"批量数据"}},[_c('el-input',{attrs:{"type":"textarea","rows":8,"placeholder":"请输入批量数据，每行一条记录，格式如下：&#10;手机号----待反代链接----有效期----时间单位(m/h/d)&#10;&#10;示例：&#10;13800138000----https://api.example.com/sms----60----m&#10;13900139000----https://api.sms8.net/api/record?token=xxx----24----h&#10;13600136000----https://api.test.com/sms----7----d"},model:{value:(_vm.batchAddForm.dataText),callback:function ($$v) {_vm.$set(_vm.batchAddForm, "dataText", $$v)},expression:"batchAddForm.dataText"}}),_c('span',{staticClass:"form-tip"},[_vm._v("时间单位：m=分钟，h=小时，d=天。不填单位默认分钟。不填有效期默认60分钟。")])],1),_c('el-form-item',{attrs:{"label":"统一有效期"}},[_c('div',{staticClass:"expire-input-group"},[_c('el-input',{attrs:{"type":"number","min":"1","placeholder":"请输入数值","disabled":!_vm.batchAddForm.useCustomExpire},model:{value:(_vm.batchAddForm.expireValue),callback:function ($$v) {_vm.$set(_vm.batchAddForm, "expireValue", $$v)},expression:"batchAddForm.expireValue"}}),_c('el-select',{attrs:{"placeholder":"选择单位","disabled":!_vm.batchAddForm.useCustomExpire},model:{value:(_vm.batchAddForm.expireUnit),callback:function ($$v) {_vm.$set(_vm.batchAddForm, "expireUnit", $$v)},expression:"batchAddForm.expireUnit"}},[_c('el-option',{attrs:{"label":"分钟","value":"m"}}),_c('el-option',{attrs:{"label":"小时","value":"h"}}),_c('el-option',{attrs:{"label":"天","value":"d"}})],1),_c('label',{staticClass:"checkbox-label"},[_c('el-checkbox',{model:{value:(_vm.batchAddForm.useCustomExpire),callback:function ($$v) {_vm.$set(_vm.batchAddForm, "useCustomExpire", $$v)},expression:"batchAddForm.useCustomExpire"}}),_c('span',[_vm._v("启用统一有效期（将覆盖每行设置）")])],1)],1)]),_c('el-form-item',{attrs:{"label":"统一图片"}},[_c('div',{staticClass:"batch-image-upload"},[_c('div',{staticClass:"image-preview-area",on:{"click":_vm.triggerBatchImageUpload}},[(_vm.batchAddForm.imageUrl)?_c('img',{staticClass:"preview-image",attrs:{"src":_vm.batchAddForm.imageUrl}}):_c('div',{staticClass:"upload-placeholder"},[_c('i',{staticClass:"el-icon-upload"}),_c('span',[_vm._v("点击上传图片")]),_c('span',{staticClass:"tip-text"},[_vm._v("（可选，统一应用到所有记录）")])])]),_c('input',{ref:"batchImageFile",staticClass:"hidden-upload",attrs:{"type":"file","accept":"image/*"},on:{"change":_vm.handleBatchImageUpload}}),(_vm.batchAddForm.imageUrl)?_c('el-button',{staticStyle:{"margin-left":"10px"},attrs:{"type":"text"},on:{"click":_vm.clearBatchImage}},[_vm._v("清除图片")]):_vm._e()],1)])],1),_c('div',{attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.batchAddDialogVisible = false}}},[_vm._v("取消")]),_c('el-button',{attrs:{"type":"primary","loading":_vm.batchAddLoading},on:{"click":_vm.confirmBatchAdd}},[_vm._v("确定")])],1)],1)],1)}
var staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(74423);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(44114);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.constructor.js
var es_iterator_constructor = __webpack_require__(18111);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.filter.js
var es_iterator_filter = __webpack_require__(22489);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.find.js
var es_iterator_find = __webpack_require__(20116);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.for-each.js
var es_iterator_for_each = __webpack_require__(7588);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.map.js
var es_iterator_map = __webpack_require__(61701);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.delete.js
var web_url_search_params_delete = __webpack_require__(14603);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.has.js
var web_url_search_params_has = __webpack_require__(47566);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.size.js
var web_url_search_params_size = __webpack_require__(98721);
// EXTERNAL MODULE: ./src/components/VabPageHeader/index.vue + 5 modules
var VabPageHeader = __webpack_require__(84399);
// EXTERNAL MODULE: ./src/api/proxy.js
var api_proxy = __webpack_require__(41);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1[0].rules[0].use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/proxy/index.vue?vue&type=script&lang=js&










//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* export default */ var proxyvue_type_script_lang_js_ = ({
  name: 'ApiAuthorization',
  components: {
    VabPageHeader: VabPageHeader["default"]
  },
  data() {
    return {
      searchForm: {
        phone: '',
        apiUrl: '',
        status: '',
        pageNo: 1,
        pageSize: 10
      },
      proxyList: [],
      total: 0,
      tableLoading: false,
      addDialogVisible: false,
      addLoading: false,
      addForm: {
        phone: '',
        apiUrl: '',
        expireMinutes: 60,
        imageUrl: '',
        imageBase64: ''
      },
      batchAddDialogVisible: false,
      batchAddLoading: false,
      batchAddForm: {
        dataText: '',
        expireValue: '',
        expireUnit: 'm',
        useCustomExpire: false,
        imageUrl: '',
        imageBase64: ''
      },
      addRules: {
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1[3-9]\d{9}$/,
          message: '请输入有效的手机号',
          trigger: 'blur'
        }],
        apiUrl: [{
          required: true,
          message: '请输入API连接URL',
          trigger: 'blur'
        }, {
          type: 'url',
          message: '请输入有效的URL',
          trigger: 'blur'
        }],
        expireMinutes: [{
          required: true,
          message: '请选择有效期',
          trigger: 'change'
        }]
      },
      selectedRows: [],
      refreshTimers: []
    };
  },
  mounted() {
    this.loadProxies();
  },
  beforeDestroy() {
    this.refreshTimers.forEach(timer => clearInterval(timer));
  },
  watch: {
    addDialogVisible(val) {
      if (!val) {
        this.addForm = {
          phone: '',
          apiUrl: '',
          expireMinutes: 60,
          imageUrl: '',
          imageBase64: ''
        };
        if (this.$refs.imageFile) {
          this.$refs.imageFile.value = '';
        }
      }
    },
    batchAddDialogVisible(val) {
      if (!val) {
        this.batchAddForm = {
          dataText: '',
          expireValue: '',
          expireUnit: 'm',
          useCustomExpire: false,
          imageUrl: '',
          imageBase64: ''
        };
        if (this.$refs.batchImageFile) {
          this.$refs.batchImageFile.value = '';
        }
      }
    }
  },
  methods: {
    async loadProxies() {
      this.tableLoading = true;
      try {
        const res = await (0,api_proxy.listProxies)();
        if (res.success) {
          this.proxyList = res.data.map(item => ({
            ...item,
            remainingTime: this.calculateRemainingTime(item.expireTime),
            isExpired: item.expireTime <= Date.now()
          }));
          this.total = this.proxyList.length;
        }
      } catch (error) {
        this.$message.error('加载授权API列表失败');
      } finally {
        this.tableLoading = false;
      }
    },
    calculateRemainingTime(expireTime) {
      const remaining = expireTime - Date.now();
      return remaining > 0 ? remaining : 0;
    },
    formatDateTime(timestamp) {
      if (!timestamp) return '-';
      const date = new Date(timestamp);
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },
    formatDuration(milliseconds) {
      if (milliseconds <= 0) return '已过期';
      const seconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (days > 0) {
        return `${days}天${hours % 24}小时`;
      } else if (hours > 0) {
        return `${hours}小时${minutes % 60}分钟`;
      } else if (minutes > 0) {
        return `${minutes}分钟`;
      } else {
        return `${seconds}秒`;
      }
    },
    getTimeTagType(remainingTime) {
      if (remainingTime <= 0) return 'danger';
      const minutes = Math.floor(remainingTime / 1000 / 60);
      if (minutes < 30) return 'warning';
      return 'success';
    },
    getProxyUrl(token) {
      return (0,api_proxy.getProxyUrl)(token);
    },
    handleAdd() {
      this.addForm = {
        phone: '',
        apiUrl: '',
        expireMinutes: 60,
        imageUrl: '',
        imageBase64: ''
      };
      this.addDialogVisible = true;
    },
    triggerImageUpload() {
      this.$refs.imageFile.click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          this.$message.error('图片大小不能超过5MB');
          return;
        }
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
          this.$message.error('只支持JPG、PNG、GIF、WebP格式的图片');
          return;
        }
        const reader = new FileReader();
        reader.onload = e => {
          const base64 = e.target.result;
          this.addForm.imageUrl = base64;
          this.addForm.imageBase64 = base64;
        };
        reader.readAsDataURL(file);
      }
    },
    clearImage() {
      this.addForm.imageUrl = '';
      this.addForm.imageBase64 = '';
      if (this.$refs.imageFile) {
        this.$refs.imageFile.value = '';
      }
    },
    async confirmAdd() {
      const form = this.$refs.addForm;
      if (!form) return;
      try {
        await form.validate();
      } catch (error) {
        return;
      }
      this.addLoading = true;
      try {
        let imageId = '';
        if (this.addForm.imageBase64) {
          const imageRes = await (0,api_proxy.uploadImage)(this.addForm.imageBase64);
          if (imageRes.success) {
            imageId = imageRes.data.imageId;
          }
        }
        const res = await (0,api_proxy.createProxy)({
          phone: this.addForm.phone,
          targetUrl: this.addForm.apiUrl,
          expireMinutes: this.addForm.expireMinutes,
          imageId: imageId
        });
        if (res.success) {
          this.$message.success('新增授权API成功');
          this.addDialogVisible = false;
          this.loadProxies();
        } else {
          this.$message.error(res.msg || '新增失败');
        }
      } catch (error) {
        this.$message.error('新增授权API失败');
      } finally {
        this.addLoading = false;
      }
    },
    async handleDelete(row) {
      try {
        await this.$confirm('确定要删除该授权API吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        const res = await (0,api_proxy.deleteProxy)(row.token);
        if (res.success) {
          this.$message.success('删除成功');
          this.loadProxies();
        } else {
          this.$message.error(res.msg || '删除失败');
        }
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('删除失败');
        }
      }
    },
    async refreshCaptcha(row) {
      try {
        const res = await (0,api_proxy.refreshCaptcha)(row.token);
        if (res.success) {
          const proxy = this.proxyList.find(p => p.token === row.token);
          if (proxy) {
            proxy.captchaCode = res.data.code || '-';
            proxy.captchaTime = res.data.code_time ? new Date(res.data.code_time).getTime() : Date.now();
          }
          this.$message.success('刷新验证码成功');
        } else {
          this.$message.error(res.msg || '刷新失败');
        }
      } catch (error) {
        this.$message.error('刷新验证码失败');
      }
    },
    copyCaptcha(row) {
      this.$copyText(row.captchaCode).then(() => {
        this.$message.success('验证码已复制');
      });
    },
    copyUrl(row) {
      this.$copyText(this.getProxyUrl(row.token)).then(() => {
        this.$message.success('链接已复制');
      });
    },
    handleSearch() {
      this.searchForm.pageNo = 1;
      this.loadProxies();
    },
    handlePageChange(pageNo) {
      this.searchForm.pageNo = pageNo;
      this.loadProxies();
    },
    handleSizeChange(pageSize) {
      this.searchForm.pageSize = pageSize;
      this.searchForm.pageNo = 1;
      this.loadProxies();
    },
    handleSelectionChange(rows) {
      this.selectedRows = rows;
    },
    handleBatchAdd() {
      this.batchAddForm = {
        dataText: '',
        expireValue: '',
        expireUnit: 'm',
        useCustomExpire: false,
        imageUrl: '',
        imageBase64: ''
      };
      this.batchAddDialogVisible = true;
    },
    triggerBatchImageUpload() {
      this.$refs.batchImageFile.click();
    },
    handleBatchImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          this.$message.error('图片大小不能超过5MB');
          return;
        }
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
          this.$message.error('只支持JPG、PNG、GIF、WebP格式的图片');
          return;
        }
        const reader = new FileReader();
        reader.onload = e => {
          const base64 = e.target.result;
          this.batchAddForm.imageUrl = base64;
          this.batchAddForm.imageBase64 = base64;
        };
        reader.readAsDataURL(file);
      }
    },
    clearBatchImage() {
      this.batchAddForm.imageUrl = '';
      this.batchAddForm.imageBase64 = '';
      if (this.$refs.batchImageFile) {
        this.$refs.batchImageFile.value = '';
      }
    },
    async confirmBatchAdd() {
      if (!this.batchAddForm.dataText.trim()) {
        this.$message.error('请输入批量数据');
        return;
      }
      const lines = this.batchAddForm.dataText.trim().split('\n').filter(line => line.trim());
      if (lines.length === 0) {
        this.$message.error('请输入有效的批量数据');
        return;
      }
      const items = [];
      const errors = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const parts = line.split('----');
        if (parts.length < 2) {
          errors.push(`第${i + 1}行格式错误，缺少分隔符`);
          continue;
        }
        const phone = parts[0].trim();
        let targetUrl = parts[1].trim();
        let expireValue = parts[2] ? parseInt(parts[2].trim()) : 60;
        let expireUnit = parts[3] ? parts[3].trim().toLowerCase() : 'm';
        targetUrl = targetUrl.replace(/^`|`$/g, '').replace(/^['"]|['"]$/g, '');
        let expireMinutes = this.convertToMinutes(expireValue, expireUnit);
        if (this.batchAddForm.useCustomExpire && this.batchAddForm.expireValue) {
          expireMinutes = this.convertToMinutes(parseInt(this.batchAddForm.expireValue), this.batchAddForm.expireUnit);
        }
        if (!targetUrl) {
          errors.push(`第${i + 1}行：待反代链接不能为空`);
          continue;
        }
        if (isNaN(expireMinutes) || expireMinutes <= 0) {
          errors.push(`第${i + 1}行：有效期无效`);
          continue;
        }
        items.push({
          phone,
          targetUrl,
          expireMinutes: expireMinutes || 60
        });
      }
      if (errors.length > 0) {
        this.$message.error('数据格式有误：\n' + errors.join('\n'));
        return;
      }
      this.batchAddLoading = true;
      try {
        let imageId = '';
        if (this.batchAddForm.imageBase64) {
          const imageRes = await (0,api_proxy.uploadImage)(this.batchAddForm.imageBase64);
          if (imageRes.success) {
            imageId = imageRes.data.imageId;
          }
        }
        const res = await (0,api_proxy.batchCreateProxy)(items, imageId);
        if (res.success) {
          const {
            successCount,
            errorCount
          } = res.data;
          let message = `批量添加完成！成功：${successCount}条`;
          if (errorCount > 0) {
            message += `，失败：${errorCount}条`;
          }
          this.$message.success(message);
          this.batchAddDialogVisible = false;
          this.loadProxies();
        } else {
          this.$message.error(res.msg || '批量添加失败');
        }
      } catch (error) {
        this.$message.error('批量添加失败');
      } finally {
        this.batchAddLoading = false;
      }
    },
    convertToMinutes(value, unit) {
      value = parseInt(value) || 0;
      switch (unit) {
        case 'h':
          return value * 60;
        case 'd':
          return value * 24 * 60;
        case 'm':
        default:
          return value;
      }
    },
    handleBatchExport() {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请先选择要导出的记录');
        return;
      }
      const exportData = this.selectedRows.map(row => ({
        phone: row.phone,
        proxyUrl: this.getProxyUrl(row.token),
        expiredDate: row.expiredDate,
        captchaCode: row.captchaCode || ''
      }));
      let csvContent = '手机号,反代链接,到期时间,验证码\n';
      exportData.forEach(item => {
        const line = [`"${item.phone}"`, `"${item.proxyUrl}"`, `"${item.expiredDate}"`, `"${item.captchaCode}"`].join(',');
        csvContent += line + '\n';
      });
      const blob = new Blob([csvContent], {
        type: 'text/csv;charset=utf-8;'
      });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `proxy_links_${Date.now()}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.$message.success('导出成功');
    }
  }
});
;// CONCATENATED MODULE: ./src/views/proxy/index.vue?vue&type=script&lang=js&
 /* export default */ var views_proxyvue_type_script_lang_js_ = (proxyvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(85072);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(97825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(77659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(55056);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(10540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(41113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/proxy/index.vue?vue&type=style&index=0&id=50d56a38&scoped=true&lang=css&
var proxyvue_type_style_index_0_id_50d56a38_scoped_true_lang_css_ = __webpack_require__(48995);
;// CONCATENATED MODULE: ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/proxy/index.vue?vue&type=style&index=0&id=50d56a38&scoped=true&lang=css&

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(proxyvue_type_style_index_0_id_50d56a38_scoped_true_lang_css_["default"], options);




       /* export default */ var views_proxyvue_type_style_index_0_id_50d56a38_scoped_true_lang_css_ = (proxyvue_type_style_index_0_id_50d56a38_scoped_true_lang_css_["default"] && proxyvue_type_style_index_0_id_50d56a38_scoped_true_lang_css_["default"].locals ? proxyvue_type_style_index_0_id_50d56a38_scoped_true_lang_css_["default"].locals : undefined);

;// CONCATENATED MODULE: ./src/views/proxy/index.vue?vue&type=style&index=0&id=50d56a38&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(14486);
;// CONCATENATED MODULE: ./src/views/proxy/index.vue



;


/* normalize component */

var component = (0,componentNormalizer["default"])(
  views_proxyvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "50d56a38",
  null
  
)

/* export default */ var views_proxy = (component.exports);

}),

}]);