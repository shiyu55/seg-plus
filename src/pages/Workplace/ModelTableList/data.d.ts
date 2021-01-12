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
