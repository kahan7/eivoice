enum INVOICE {
  CREATE = 'invoice.create',
  GET_BY_ID = 'invoice.get_by_id',
  UPDATE_BY_ID = 'invoice.update_by_id',
  DELETE_BY_ID = 'invoice.delete_by_id',
}

enum PRODUCT {
  CREATE = 'product.create',
  GET_LIST = 'product.get_list',
  GET_BY_ID = 'product.get_by_id',
  UPDATE_BY_ID = 'product.update_by_id',
  DELETE_BY_ID = 'product.delete_by_id',
}
enum USER {
  CREATE = 'user.create',
  GET_BY_ALL = 'user.get_all',
}

export const TCP_REQUEST_MESSAGES = { INVOICE, PRODUCT, USER };
