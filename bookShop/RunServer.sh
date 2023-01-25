# #!/bin/bash
# python3 -m venv env
# echo 'Created venv'
# source env/bin/activate
# echo 'Activated venv'
# pip3 install -U pip
# echo 'Updated Pip'
# pip3 install -r requirements.txt
# echo 'Installed'
# python3 manage.py runserver

gunicorn --bind 0.0.0.0:8000 bookShop.wsgi
