def paginate(model_or_query, page, per_page):
    if page is None:
        page = 1
    if per_page is None:
        per_page = 10

    if page < 1:
        page = 1
    if per_page < 1:
        per_page = 10

    query = model_or_query
    if hasattr(model_or_query, 'query'):
        query = model_or_query.query

    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    return {
        'items': pagination.items,
        'pagination': {
            'page': pagination.page,
            'per_page': pagination.per_page,
            'total': pagination.total,
            'pages': pagination.pages,
            'has_next': pagination.has_next,
            'has_prev': pagination.has_prev,
        }
    }

