def paginate(Class, page, per_page):
    if page < 1 or per_page < 1:
        return 1, 1
    pagination = Class.query.paginate(page=page, per_page=per_page)
    return {
        'items': pagination.items,
        'pagination': {
            'total': pagination.total,
            'pages': pagination.pages,
            'per_page': pagination.per_page,
            'total_pages': pagination.pages,
        }
    }

