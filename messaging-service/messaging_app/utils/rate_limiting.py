from django.core.cache import cache
from django.http import HttpResponseForbidden

class RateLimiter:
    @staticmethod
    def check_rate_limit(request, key_prefix, limit, window):
        cache_key = f"{key_prefix}_{request.user.id}"
        count = cache.get(cache_key, 0)
        
        if count >= limit:
            return False
        
        cache.set(cache_key, count+1, window)
        return True