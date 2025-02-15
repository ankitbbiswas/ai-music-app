from django.db import models

class Music(models.Model):
    title = models.CharField(max_length=255)
    generated_music = models.FileField(upload_to='music/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title