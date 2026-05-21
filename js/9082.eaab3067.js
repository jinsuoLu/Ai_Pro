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
(self["rspackChunkvue_admin_better"] = self["rspackChunkvue_admin_better"] || []).push([[9082], {
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
43010: (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__rspack_import_0 = __webpack_require__(31601);
/* import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__rspack_import_0_default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__rspack_import_0);
/* import */ var _node_modules_css_loader_dist_runtime_api_js__rspack_import_1 = __webpack_require__(76314);
/* import */ var _node_modules_css_loader_dist_runtime_api_js__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__rspack_import_1);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__rspack_import_1_default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__rspack_import_0_default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.user-container[data-v-aa4af86c] {\n  padding: 20px;\n}\n", ""]);
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
99713: (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ views_user; }
});

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/user/index.vue?vue&type=template&id=aa4af86c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"user-container"},[_c('vab-page-header',{attrs:{"description":"管理系统用户，分配授权API使用权限","icon":['fas', 'users'],"title":"用户管理"}}),_c('vab-query-form',[_c('vab-query-form-left-panel',[_c('el-button',{attrs:{"icon":"el-icon-plus","type":"primary"},on:{"click":_vm.handleAdd}},[_vm._v("新增用户")]),_c('el-button',{attrs:{"icon":"el-icon-refresh","type":"info"},on:{"click":_vm.loadUsers}},[_vm._v("刷新列表")])],1),_c('vab-query-form-right-panel',[_c('el-form',{ref:"searchForm",attrs:{"inline":true,"model":_vm.searchForm},nativeOn:{"submit":function($event){$event.preventDefault();}}},[_c('el-form-item',[_c('el-input',{attrs:{"placeholder":"用户名","clearable":""},model:{value:(_vm.searchForm.username),callback:function ($$v) {_vm.$set(_vm.searchForm, "username", $$v)},expression:"searchForm.username"}})],1),_c('el-form-item',[_c('el-select',{attrs:{"placeholder":"状态","clearable":""},model:{value:(_vm.searchForm.status),callback:function ($$v) {_vm.$set(_vm.searchForm, "status", $$v)},expression:"searchForm.status"}},[_c('el-option',{attrs:{"label":"全部","value":""}}),_c('el-option',{attrs:{"label":"启用","value":"active"}}),_c('el-option',{attrs:{"label":"禁用","value":"disabled"}})],1)],1),_c('el-form-item',[_c('el-button',{attrs:{"icon":"el-icon-search","native-type":"submit","type":"primary"},on:{"click":_vm.handleSearch}},[_vm._v("查询")])],1)],1)],1)],1),_c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.tableLoading),expression:"tableLoading"}],ref:"userTable",attrs:{"data":_vm.userList,"element-loading-text":'加载中...'}},[_c('el-table-column',{attrs:{"label":"序号","width":"60"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v("\n        "+_vm._s((_vm.searchForm.pageNo - 1) * _vm.searchForm.pageSize + scope.$index + 1)+"\n      ")]}}])}),_c('el-table-column',{attrs:{"label":"用户名","prop":"username","show-overflow-tooltip":"","width":"120"}}),_c('el-table-column',{attrs:{"label":"昵称","prop":"nickname","show-overflow-tooltip":"","width":"120"}}),_c('el-table-column',{attrs:{"label":"角色","show-overflow-tooltip":"","width":"100"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var row = ref.row;
return [_c('el-tag',{attrs:{"type":row.role === 'admin' ? 'danger' : 'primary'}},[_vm._v("\n          "+_vm._s(row.role === 'admin' ? '管理员' : '普通用户')+"\n        ")])]}}])}),_c('el-table-column',{attrs:{"label":"状态","show-overflow-tooltip":"","width":"80"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var row = ref.row;
return [_c('el-switch',{attrs:{"active-value":"active","inactive-value":"disabled"},on:{"change":function($event){return _vm.handleStatusChange(row)}},model:{value:(row.status),callback:function ($$v) {_vm.$set(row, "status", $$v)},expression:"row.status"}})]}}])}),_c('el-table-column',{attrs:{"label":"授权API数量","show-overflow-tooltip":"","width":"100"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var row = ref.row;
return [_c('el-link',{attrs:{"type":"primary"},on:{"click":function($event){return _vm.showUserProxies(row)}}},[_vm._v("\n          "+_vm._s(row.proxyCount || 0)+" 个\n        ")])]}}])}),_c('el-table-column',{attrs:{"label":"创建时间","prop":"createdAt","show-overflow-tooltip":"","width":"160"}}),_c('el-table-column',{attrs:{"label":"操作","show-overflow-tooltip":"","min-width":"200"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var row = ref.row;
return [_c('el-button',{attrs:{"type":"text","icon":"el-icon-edit"},on:{"click":function($event){return _vm.handleEdit(row)}}},[_vm._v("\n          编辑\n        ")]),_c('el-button',{attrs:{"type":"text","icon":"el-icon-key"},on:{"click":function($event){return _vm.handleAssignProxy(row)}}},[_vm._v("\n          分配权限\n        ")]),_c('el-button',{staticStyle:{"color":"#f56c6c"},attrs:{"type":"text","icon":"el-icon-delete","disabled":row.role === 'admin'},on:{"click":function($event){return _vm.handleDelete(row)}}},[_vm._v("\n          删除\n        ")])]}}])})],1),_c('el-pagination',{attrs:{"background":true,"current-page":_vm.searchForm.pageNo,"layout":'total, sizes, prev, pager, next, jumper',"page-size":_vm.searchForm.pageSize,"total":_vm.total},on:{"current-change":_vm.handlePageChange,"size-change":_vm.handleSizeChange}}),_c('el-dialog',{attrs:{"title":"新增用户","visible":_vm.addDialogVisible,"width":"500px"},on:{"update:visible":function($event){_vm.addDialogVisible=$event}}},[_c('el-form',{ref:"addForm",attrs:{"model":_vm.addForm,"rules":_vm.addRules,"label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"用户名","prop":"username"}},[_c('el-input',{attrs:{"placeholder":"请输入用户名"},model:{value:(_vm.addForm.username),callback:function ($$v) {_vm.$set(_vm.addForm, "username", $$v)},expression:"addForm.username"}})],1),_c('el-form-item',{attrs:{"label":"密码","prop":"password"}},[_c('el-input',{attrs:{"type":"password","placeholder":"请输入密码","show-password":""},model:{value:(_vm.addForm.password),callback:function ($$v) {_vm.$set(_vm.addForm, "password", $$v)},expression:"addForm.password"}})],1),_c('el-form-item',{attrs:{"label":"昵称","prop":"nickname"}},[_c('el-input',{attrs:{"placeholder":"请输入昵称"},model:{value:(_vm.addForm.nickname),callback:function ($$v) {_vm.$set(_vm.addForm, "nickname", $$v)},expression:"addForm.nickname"}})],1),_c('el-form-item',{attrs:{"label":"角色","prop":"role"}},[_c('el-select',{attrs:{"placeholder":"请选择角色"},model:{value:(_vm.addForm.role),callback:function ($$v) {_vm.$set(_vm.addForm, "role", $$v)},expression:"addForm.role"}},[_c('el-option',{attrs:{"label":"普通用户","value":"user"}}),_c('el-option',{attrs:{"label":"管理员","value":"admin"}})],1)],1)],1),_c('div',{attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.addDialogVisible = false}}},[_vm._v("取消")]),_c('el-button',{attrs:{"type":"primary","loading":_vm.addLoading},on:{"click":_vm.confirmAdd}},[_vm._v("确定")])],1)],1),_c('el-dialog',{attrs:{"title":"编辑用户","visible":_vm.editDialogVisible,"width":"500px"},on:{"update:visible":function($event){_vm.editDialogVisible=$event}}},[_c('el-form',{ref:"editForm",attrs:{"model":_vm.editForm,"rules":_vm.editRules,"label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"用户名"}},[_c('el-input',{attrs:{"disabled":""},model:{value:(_vm.editForm.username),callback:function ($$v) {_vm.$set(_vm.editForm, "username", $$v)},expression:"editForm.username"}})],1),_c('el-form-item',{attrs:{"label":"新密码"}},[_c('el-input',{attrs:{"type":"password","placeholder":"不修改请留空","show-password":""},model:{value:(_vm.editForm.password),callback:function ($$v) {_vm.$set(_vm.editForm, "password", $$v)},expression:"editForm.password"}})],1),_c('el-form-item',{attrs:{"label":"昵称","prop":"nickname"}},[_c('el-input',{attrs:{"placeholder":"请输入昵称"},model:{value:(_vm.editForm.nickname),callback:function ($$v) {_vm.$set(_vm.editForm, "nickname", $$v)},expression:"editForm.nickname"}})],1),_c('el-form-item',{attrs:{"label":"角色","prop":"role"}},[_c('el-select',{attrs:{"placeholder":"请选择角色"},model:{value:(_vm.editForm.role),callback:function ($$v) {_vm.$set(_vm.editForm, "role", $$v)},expression:"editForm.role"}},[_c('el-option',{attrs:{"label":"普通用户","value":"user"}}),_c('el-option',{attrs:{"label":"管理员","value":"admin"}})],1)],1)],1),_c('div',{attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.editDialogVisible = false}}},[_vm._v("取消")]),_c('el-button',{attrs:{"type":"primary","loading":_vm.editLoading},on:{"click":_vm.confirmEdit}},[_vm._v("确定")])],1)],1),_c('el-dialog',{attrs:{"title":"分配授权API权限","visible":_vm.assignDialogVisible,"width":"700px"},on:{"update:visible":function($event){_vm.assignDialogVisible=$event}}},[_c('el-transfer',{attrs:{"data":_vm.allProxies,"titles":['可用授权API', '已分配授权API'],"props":{
        key: 'token',
        label: 'phone'
      },"filterable":"","filter-placeholder":"搜索手机号"},model:{value:(_vm.assignedProxies),callback:function ($$v) {_vm.assignedProxies=$$v},expression:"assignedProxies"}}),_c('div',{attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.assignDialogVisible = false}}},[_vm._v("取消")]),_c('el-button',{attrs:{"type":"primary","loading":_vm.assignLoading},on:{"click":_vm.confirmAssign}},[_vm._v("确定")])],1)],1),_c('el-dialog',{attrs:{"title":'用户 ' + _vm.currentUser.username + ' 的授权API列表',"visible":_vm.proxyListDialogVisible,"width":"800px"},on:{"update:visible":function($event){_vm.proxyListDialogVisible=$event}}},[_c('el-table',{attrs:{"data":_vm.currentUserProxies,"max-height":"400"}},[_c('el-table-column',{attrs:{"label":"手机号","prop":"phone","width":"120"}}),_c('el-table-column',{attrs:{"label":"反代链接","show-overflow-tooltip":"","min-width":"250"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
      var row = ref.row;
return [_vm._v("\n          "+_vm._s(_vm.getProxyUrl(row.token))+"\n        ")]}}])}),_c('el-table-column',{attrs:{"label":"到期时间","prop":"expiredDate","width":"160"}}),_c('el-table-column',{attrs:{"label":"状态","width":"80"},scopedSlots:_vm._u([{key:"default",fn:function(ref){
      var row = ref.row;
return [_c('el-tag',{attrs:{"type":row.isExpired ? 'danger' : 'success'}},[_vm._v("\n            "+_vm._s(row.isExpired ? '已过期' : '有效')+"\n          ")])]}}])})],1),_c('div',{attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.proxyListDialogVisible = false}}},[_vm._v("关闭")])],1)],1)],1)}
var staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.constructor.js
var es_iterator_constructor = __webpack_require__(18111);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.map.js
var es_iterator_map = __webpack_require__(61701);
// EXTERNAL MODULE: ./src/components/VabPageHeader/index.vue + 5 modules
var VabPageHeader = __webpack_require__(84399);
// EXTERNAL MODULE: ./src/api/user.js
var user = __webpack_require__(81878);
// EXTERNAL MODULE: ./src/api/proxy.js
var proxy = __webpack_require__(41);
// EXTERNAL MODULE: ./src/config/net.config.js
var net_config = __webpack_require__(66016);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1[0].rules[0].use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/user/index.vue?vue&type=script&lang=js&


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





/* export default */ var uservue_type_script_lang_js_ = ({
  name: 'UserManagement',
  components: {
    VabPageHeader: VabPageHeader["default"]
  },
  data() {
    return {
      searchForm: {
        username: '',
        status: '',
        pageNo: 1,
        pageSize: 10
      },
      userList: [],
      total: 0,
      tableLoading: false,
      addDialogVisible: false,
      addLoading: false,
      addForm: {
        username: '',
        password: '',
        nickname: '',
        role: 'user'
      },
      addRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }, {
          min: 3,
          max: 20,
          message: '用户名长度3-20个字符',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 20,
          message: '密码长度6-20个字符',
          trigger: 'blur'
        }],
        nickname: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        role: [{
          required: true,
          message: '请选择角色',
          trigger: 'change'
        }]
      },
      editDialogVisible: false,
      editLoading: false,
      editForm: {
        id: '',
        username: '',
        password: '',
        nickname: '',
        role: 'user'
      },
      editRules: {
        nickname: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        role: [{
          required: true,
          message: '请选择角色',
          trigger: 'change'
        }]
      },
      assignDialogVisible: false,
      assignLoading: false,
      currentUserId: '',
      assignedProxies: [],
      allProxies: [],
      proxyListDialogVisible: false,
      currentUser: {},
      currentUserProxies: []
    };
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      this.tableLoading = true;
      try {
        const res = await (0,user.listUsers)();
        if (res.success) {
          this.userList = res.data.map(item => ({
            ...item,
            createdAt: this.formatDateTime(item.createdAt)
          }));
          this.total = this.userList.length;
        }
      } catch (error) {
        this.$message.error('加载用户列表失败');
      } finally {
        this.tableLoading = false;
      }
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
    getProxyUrl(token) {
      return `${net_config.backendServerUrl}/proxy/${token}`;
    },
    handleAdd() {
      this.addForm = {
        username: '',
        password: '',
        nickname: '',
        role: 'user'
      };
      this.addDialogVisible = true;
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
        const res = await (0,user.createUser)(this.addForm);
        if (res.success) {
          this.$message.success('新增用户成功');
          this.addDialogVisible = false;
          this.loadUsers();
        } else {
          this.$message.error(res.msg || '新增失败');
        }
      } catch (error) {
        this.$message.error('新增用户失败');
      } finally {
        this.addLoading = false;
      }
    },
    handleEdit(row) {
      this.editForm = {
        id: row.id,
        username: row.username,
        password: '',
        nickname: row.nickname,
        role: row.role
      };
      this.editDialogVisible = true;
    },
    async confirmEdit() {
      const form = this.$refs.editForm;
      if (!form) return;
      try {
        await form.validate();
      } catch (error) {
        return;
      }
      this.editLoading = true;
      try {
        const res = await (0,user.updateUser)(this.editForm.id, this.editForm);
        if (res.success) {
          this.$message.success('编辑用户成功');
          this.editDialogVisible = false;
          this.loadUsers();
        } else {
          this.$message.error(res.msg || '编辑失败');
        }
      } catch (error) {
        this.$message.error('编辑用户失败');
      } finally {
        this.editLoading = false;
      }
    },
    async handleDelete(row) {
      if (row.role === 'admin') {
        this.$message.warning('不能删除管理员用户');
        return;
      }
      try {
        await this.$confirm('确定要删除该用户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        const res = await (0,user.deleteUser)(row.id);
        if (res.success) {
          this.$message.success('删除成功');
          this.loadUsers();
        } else {
          this.$message.error(res.msg || '删除失败');
        }
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('删除失败');
        }
      }
    },
    async handleStatusChange(row) {
      try {
        const res = await (0,user.updateUser)(row.id, {
          status: row.status
        });
        if (res.success) {
          this.$message.success('状态更新成功');
        } else {
          row.status = row.status === 'active' ? 'disabled' : 'active';
          this.$message.error(res.msg || '状态更新失败');
        }
      } catch (error) {
        row.status = row.status === 'active' ? 'disabled' : 'active';
        this.$message.error('状态更新失败');
      }
    },
    async handleAssignProxy(row) {
      this.currentUserId = row.id;
      const proxyRes = await (0,proxy.listProxies)();
      if (proxyRes.success) {
        this.allProxies = proxyRes.data;
      }
      const userProxyRes = await (0,user.getUserProxies)(row.id);
      if (userProxyRes.success) {
        this.assignedProxies = userProxyRes.data.map(p => p.token);
      }
      this.assignDialogVisible = true;
    },
    async confirmAssign() {
      this.assignLoading = true;
      try {
        const res = await (0,user.assignProxies)(this.currentUserId, this.assignedProxies);
        if (res.success) {
          this.$message.success('分配权限成功');
          this.assignDialogVisible = false;
          this.loadUsers();
        } else {
          this.$message.error(res.msg || '分配权限失败');
        }
      } catch (error) {
        this.$message.error('分配权限失败');
      } finally {
        this.assignLoading = false;
      }
    },
    async showUserProxies(row) {
      this.currentUser = row;
      try {
        const res = await (0,user.getUserProxies)(row.id);
        if (res.success) {
          const now = Date.now();
          this.currentUserProxies = res.data.map(item => ({
            ...item,
            expiredDate: this.formatDateTime(item.expireTime),
            isExpired: item.expireTime <= now
          }));
        }
      } catch (error) {
        this.$message.error('获取用户授权API列表失败');
      }
      this.proxyListDialogVisible = true;
    },
    handleSearch() {
      this.searchForm.pageNo = 1;
      this.loadUsers();
    },
    handlePageChange(pageNo) {
      this.searchForm.pageNo = pageNo;
      this.loadUsers();
    },
    handleSizeChange(pageSize) {
      this.searchForm.pageSize = pageSize;
      this.searchForm.pageNo = 1;
      this.loadUsers();
    }
  }
});
;// CONCATENATED MODULE: ./src/views/user/index.vue?vue&type=script&lang=js&
 /* export default */ var views_uservue_type_script_lang_js_ = (uservue_type_script_lang_js_); 
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
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/user/index.vue?vue&type=style&index=0&id=aa4af86c&scoped=true&lang=css&
var uservue_type_style_index_0_id_aa4af86c_scoped_true_lang_css_ = __webpack_require__(43010);
;// CONCATENATED MODULE: ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/user/index.vue?vue&type=style&index=0&id=aa4af86c&scoped=true&lang=css&

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(uservue_type_style_index_0_id_aa4af86c_scoped_true_lang_css_["default"], options);




       /* export default */ var views_uservue_type_style_index_0_id_aa4af86c_scoped_true_lang_css_ = (uservue_type_style_index_0_id_aa4af86c_scoped_true_lang_css_["default"] && uservue_type_style_index_0_id_aa4af86c_scoped_true_lang_css_["default"].locals ? uservue_type_style_index_0_id_aa4af86c_scoped_true_lang_css_["default"].locals : undefined);

;// CONCATENATED MODULE: ./src/views/user/index.vue?vue&type=style&index=0&id=aa4af86c&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(14486);
;// CONCATENATED MODULE: ./src/views/user/index.vue



;


/* normalize component */

var component = (0,componentNormalizer["default"])(
  views_uservue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "aa4af86c",
  null
  
)

/* export default */ var views_user = (component.exports);

}),

}]);