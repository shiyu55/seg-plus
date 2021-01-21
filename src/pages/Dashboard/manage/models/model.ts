import {
  admin01saveOne,
  admin01updateOne,
  admin01delOne,
  Schedulelist,
  admin01loaddatelist,
  Pei,
  Pei2,
  steelstructureSummary
} from '../service/service';
import type { Subscription } from 'umi';


export type manageIndexModelState = {

  managefields: [];
  admin01fields: [];
  adminListfields: [];
  adminTotlefields: [];
  steelstructureSummaryfields: [];
  // eslint-disable-next-line @typescript-eslint/ban-types
  current: object;
  subscriptions: { setup: Subscription };
  showEdit: string;
  isEdit: string;
 
};

const manageindex = {
  namespace: 'manageindex',

  state: {
    managefields: [],
    admin01fields: [],
    adminListfields: [],
    adminTotlefields: [],
    steelstructureSummaryfields: [],
    current: {},
    showEdit: false,
    isEdit: false,
    
  },

  effects: {
    // eslint-disable-next-line no-empty-pattern
    *admin01loadData({ }, { call, put }: any) {// 查
     
      const res = yield call(admin01loaddatelist);
      yield put({
        type: 'save',
        payload: {
          admin01fields:res.data.records.map((record: any,Index: any)=> {
            return{
             id:Index+1,
             ...record.fields,
             recordIds: record.recordId,
            };
          }),
          showEdit: false,
          isEdit: false,

        },
      });
    },
 
   
    // eslint-disable-next-line no-empty-pattern
    *adminTotlefields({}, { call, put }: any) {
      const res = yield call(Pei);
      yield put({
        type: 'save',
        payload: {
          adminTotlefields: res.data.records.map((record: any,Index: any)=> {
            return{
             id:Index+1,
             ...record.fields,
             recordIds: record.recordId,
            };
          }
          ),
        },
        
      });
      
    },
    
    // eslint-disable-next-line no-empty-pattern
    *adminListfields({ }, { call, put }: any) {
      const res = yield call(Pei2);
      yield put({
        type: 'save',
        payload: {
          adminListfields: res.data.records.map((record: any,Index: any)=> {
           
            return{
              
             id:Index+1,
             ...record.fields,
             recordIds: record.recordId,
            };
          }),
        },
      });
    },
 // eslint-disable-next-line no-empty-pattern
 *steelstructureSummarymodle({}, { call, put }: any) {
  const res = yield call(steelstructureSummary);
  yield put({
    type: 'save',
    payload: {
      steelstructureSummaryfields: res.data.records.map((record: any,Index: any)=> {
        return{
         id:Index+1,
         ...record.fields,
         recordIds: record.recordId,
        };
      }
      ),
    },
    
  });
  
},
    // eslint-disable-next-line no-empty-pattern
    *ScheduleData({ }, { call, put }: any) {
      const res = yield call(Schedulelist);
      yield put({
        type: 'save',
        payload: {
          managefields:  res.data.records.map((record: any,Index: any)=> {
           
            return{
              
             id:Index+1,
             ...record.fields,
             recordIds: record.recordId,
            };
          }),
          showEdit: false,
          isEdit: false,
        },
      });
    },
    
   

    *admin01insert({ payload }: any, { call, put }: any) {


      yield call(admin01saveOne, payload); // 增加公司人员
      yield put({
        type: 'admin01loadData',
        payload: {
          
        },
      });
    },

    *admin01update({ payload }: any, { call, put }: any) {
     
      yield call(admin01updateOne, payload.current.recordIds,payload.current.records);
      yield put({
        type: 'admin01loadData',
        payload: {

        },
      });
    },
    *admin01del({ payload }: any, { call, put }: any) {
    
      yield call(admin01delOne, payload.current.recordIds);
      yield put({
        type: 'admin01loadData',
        payload: {},
      });
    },
  },

  reducers: {
    save(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }: any) {
      return history.listen(({ pathname }: any) => {
        if (pathname === '/dashboard/manage/table') {
          dispatch({
            type: 'admin01loadData',
          });

        }
        if (pathname === '/dashboard/construction/steelstructure') {
          dispatch({
            type: 'steelstructureSummarymodle',
          });

        }
        if (pathname === '/dashboard/manage') {
          dispatch({
            type: 'ScheduleData',
          });
          dispatch({
            type: 'adminListfields',
          });
          dispatch({
            type: 'adminTotlefields',
          });
        }
   /*      if (pathname === '/dashboard/manage') {
          dispatch({
            type: 'ScheduleData3',
          });
         
        }
        if (pathname === '/dashboard/manage') {
          dispatch({
            type: 'ScheduleData4',
          });
         
        } */
      });
    },
  },
};
export default manageindex;
