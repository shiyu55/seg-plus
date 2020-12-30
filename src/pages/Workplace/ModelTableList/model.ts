import type { Effect, Reducer, Subscription } from 'umi';
import { query } from './service';
// import type { ModelTableListType } from './data.d';

function addTodo() {}

export type ModelTableListState = {
  list: [];
};

export type ModelTableListType = {
  namespace: string;
  state: ModelTableListState;
  effects: {
    // someEffect: Effect;
    someEffect: Effect;
    query: Effect;
  };
  reducers: {
    save: Reducer<ModelTableListState>;
  };
  subscriptions: { setup: Subscription };
};

const TableListModel: ModelTableListType = {
  namespace: 'index',
  state: {
    list: [],
  },

  effects: {
    // someEffect: function*() {},
    *someEffect({ payload: todo }, { put, call }) {
      yield call(addTodo, todo);
      yield put({ type: 'add', payload: todo });
    },

    *query({ payload }, { call, put }) {
      const rsp = yield call(query, payload);
      yield put({
        type: 'save',
        payload: {
          list: rsp.data.records.map((item: any, index: number) => {
            return {
              ...item,
              id: index + 1,
              recordId: item.recordId,
              编码: item.fields.编码,
              姓名: item.fields.姓名,
              起薪单位: item.fields.起薪单位,
              在册单位: item.fields.在册单位,
              现所在单位: item.fields.现所在单位,
            };
          }),
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/workplace/model') {
          dispatch({ type: 'query' });
        }
      });
    },
  },
};

export default TableListModel;
