from django.test import TestCase
from django.urls import reverse

class BasicTests(TestCase):
    def test_admin_accessible(self):
        response = self.client.get(reverse('admin:index'))
        self.assertEqual(response.status_code, 302)  # Redirect to login
    
    def test_api_root(self):
        response = self.client.get('/api/')
        self.assertIn(response.status_code, [200, 401, 403])