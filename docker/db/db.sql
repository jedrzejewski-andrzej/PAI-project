CREATE OR REPLACE TABLE games (
    id INT,
    data VARCHAR(50),
    kraj1 VARCHAR(50),
    kraj2 VARCHAR(50),
    wynik_kraj_1 INT,
    wynik_kraj_2 INT
);
INSERT INTO games VALUES (1,'18.12.2022', 'Francja','Argentyna',3,4);
INSERT INTO games VALUES (2,'13.12.2022', 'Argentyna','Chorwacja',2,0);
INSERT INTO games VALUES (3,'09.12.2022', 'Holandia','Argentyna',2,3);