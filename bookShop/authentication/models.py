from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)


class MyUserManager(BaseUserManager):
    def create_user(self, username, email, date_of_birth,name,last_name, password):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have an username')

        if not username:
            raise ValueError('Users must have an password')

        user = self.model(
            email=MyUserManager.normalize_email(email),
            username=username,
            date_of_birth=date_of_birth,
            name=name,
            last_name=last_name
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, date_of_birth,name,last_name, password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(username=username,
                                password=password,
                                email=email,
                                date_of_birth=date_of_birth,
                                name = name,
                                last_name = last_name
                                )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=45, unique=True)
    name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    date_of_birth = models.DateField()
    img = models.ImageField(default='images/user_images/default_user_image.png',upload_to='images/user_images/')
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    bucket = models.JSONField(default=list,blank=True)
    address = models.CharField(max_length=100,blank=True)
    objects = MyUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'date_of_birth','name','last_name']

    def get_full_name(self):
        return self.name + " " + self.last_name

    def get_short_name(self):
        return self.name

    def __unicode__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
