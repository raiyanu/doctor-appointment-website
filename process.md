### how to run this

- install php

    ```bash
    sudo apt install php php-cli php-mysql
    sudo apt install php-mysqli

sudo apt install libmysqlclient-dev

    # additional optional 
    sudo apt install php-xml php-mbstring php-curl php-zip php-gd
    ```

- install mysql > sudo apt install mysql-server
- purge all the default > `mysql -u root -p`

```sql
CREATE DATABASE db_healthcare;
USE db_healthcare;
SOURCE /path/db_healthcare.sql;
```

```bash
 ╭─ray@ray in /var/lib🔒 as 🧙 took 13s
 ╰─λ sudo mysqld --initialize --user=mysql --datadir=/var/lib/mysql
```

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '123';
```
