# Generated by Django 5.2.1 on 2025-06-07 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('authUser', '0001_initial'),
        ('notes', '0001_initial'),
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='shared_notes',
            field=models.ManyToManyField(blank=True, related_name='notes_shared', to='notes.note'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='shared_projects',
            field=models.ManyToManyField(blank=True, related_name='project_shared', to='project.project'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
    ]
