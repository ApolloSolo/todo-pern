DROP TABLE IF EXISTS todos;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    email VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL
);

DROP TABLE IF EXISTS todos;

CREATE TABLE todos(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL,
    task TEXT,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL DEFAULT CURRENT_DATE,
    days_left INT,
    completed BOOL DEFAULT false,
    days_ahead INT DEFAULT 0,
    CONSTRAINT FK_user_todo FOREIGN KEY(username)
        REFERENCES users(username)
);




#####

CREATE [OR REPLACE] FUNCTION function_name (arguments)     
RETURNS return_datatype   
LANGUAGE plpgsql  
AS $variable_name$    
DECLARE    
declaration;    
[...] -- variable declaration   
 BEGIN    
< function_body >    
[...]  -- logic  
RETURN { variable_name | value }    
END;   
$$  

CREATE OR REPLACE FUNCTION get_todo_count_Range(Days_from int, Days_to int, Username_user VARCHAR(28))
RETURNS int
LANGUAGE plpgsql
AS
$$
DECLARE
Todo_count integer;
BEGIN
    SELECT COUNT(*)
    INTO Todo_count
    FROM todos
    WHERE todos.username = Username_user AND days_left between Days_from AND Days_to;
RETURN Todo_count;
END;
$$;

CREATE OR REPLACE FUNCTION get_due_Today(Username_user VARCHAR(28))
RETURNS int
LANGUAGE plpgsql
AS
$$
DECLARE
Todo_count integer;
BEGIN
    SELECT COUNT(*)
    INTO Todo_count
    FROM todos
    WHERE todos.username = Username_user AND days_left = 0;
RETURN Todo_count;
END;
$$;

CREATE OR REPLACE FUNCTION get_due_Week(Username_user VARCHAR(28))
RETURNS int
LANGUAGE plpgsql
AS
$$
DECLARE
Todo_count integer;
BEGIN
    SELECT COUNT(*)
    INTO Todo_count
    FROM todos
    WHERE todos.username = Username_user AND days_left between 0 AND 6;
RETURN Todo_count;
END;
$$;    

CREATE OR REPLACE FUNCTION get_due_30(Username_user VARCHAR(28))
RETURNS int
LANGUAGE plpgsql
AS
$$
DECLARE
Todo_count integer;
BEGIN
    SELECT COUNT(*)
    INTO Todo_count
    FROM todos
    WHERE todos.username = Username_user AND days_left between 0 AND 29;
RETURN Todo_count;
END;
$$; 

CREATE OR REPLACE FUNCTION get_due_beyond_30(Username_user VARCHAR(28))
RETURNS int
LANGUAGE plpgsql
AS
$$
DECLARE
Todo_count integer;
BEGIN
    SELECT COUNT(*)
    INTO Todo_count
    FROM todos
    WHERE todos.username = Username_user AND days_left > 30;
RETURN Todo_count;
END;
$$; 