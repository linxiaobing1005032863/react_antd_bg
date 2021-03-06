/**
 * Created by zhouchaoyi on 2016/10/24.
 */
import React from 'react'

const _tableData = {
    pageSize: 10
};

const _itemProp = {
    typeId: "",
    typeCode: "",
    typeName: "",
    remark: "",
    status: "0"
}

const initialState = {
    tableData:_tableData,
    isShowBox:false,
    reloadGrid: false,
    userTypeProp: _itemProp,
    loading: true,
    saving: false
}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case 'SHOW_BOX':
            if(action.payload) {
                return Object.assign({},state,{isShowBox: action.payload})
            }else {
                return Object.assign({},state,{isShowBox: action.payload,userTypeProp: initialState.userTypeProp})
            }

        case 'SHOW_SAVING':
            return Object.assign({},state,{saving: action.payload})

        case 'GET_USER_TYPE':
            return Object.assign({}, state, {
                tableData: action.payload.data,
                reloadGrid: false,
                loading: false
            })

        case 'DEL_USER_TYPE':
            let num = action.meta.total % action.meta.pageSize;
            if(num==1 && action.meta.currentPage==action.meta.pages) {
                //如果删除的记录是最后一页的唯一1个，跳转到首页
                action.meta.currentPage=1;
                return Object.assign({},state,{reloadGrid: true, tableData: action.meta})
            }else {
                return Object.assign({},state,{reloadGrid: true})
            }

        case 'ADD_USER_TYPE':
            //console.log("come in ADD_USER_TYPE<<<<<<<<<");
            //return state;
            return Object.assign({},state,{
                reloadGrid: true, 
                isShowBox: false,
                saving: false
            })

        case 'EDIT_USER_TYPE':
            return Object.assign({},state,{
                reloadGrid: true, 
                isShowBox: false, 
                saving: false,
                userTypeProp: initialState.userTypeProp
            })


        case 'QUERY_USERTYPE_BY_ID':
            return Object.assign({}, state, {userTypeProp: action.payload.data, isShowBox: true });

        default:
            return state;
    }


}