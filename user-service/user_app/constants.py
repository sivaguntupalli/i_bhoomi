# 📄 File: user_app/constants.py

ROLES = {
    'ADMIN': {
        'name': 'admin',
        'permissions': ['manage_users', 'manage_content', 'view_reports'],
        'display': 'Administrator'
    },
    'OPERATOR': {
        'name': 'operator',
        'permissions': ['manage_content', 'view_reports'],
        'display': 'System Operator'
    },
    'AGENT': {
        'name': 'agent',
        'permissions': ['manage_tickets'],
        'display': 'Support Agent'
    },
    # 🔁 Replaced buyer and seller roles with 'individual'
    'INDIVIDUAL': {
        'name': 'individual',
        'permissions': ['place_orders', 'manage_products'],
        'display': 'Individual'
    }
}

# Utility functions
def get_role_choices():
    return [(role['name'], role['display']) for role in ROLES.values()]

def get_permissions(role_name):
    return next((role['permissions'] for role in ROLES.values()
               if role['name'] == role_name), [])
