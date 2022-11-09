USE new_world;

SELECT name, population
FROM country 
WHERE population>8000000;

SELECT name
FROM country 
WHERE name LIKE "%land%";


SELECT name, population6 
FROM city 
WHERE population BETWEEN 500000 AND 1000000;

SELECT name, continent
FROM country 
WHERE continent= "EUROPE";

SELECT name, surfaceArea
FROM country 
ORDER BY surfaceArea DESC;

SELECT city.name AS 'Cities in NLD'
FROM city city
JOIN country country
ON city.countryCode=country.code
WHERE country.name="Netherlands";

SELECT city.name as Name, city.population as Population
FROM city city
HAVING city.name="Rotterdam";

SELECT name, surfaceArea as Area
FROM country
ORDER BY surfaceArea DESC
LIMIT 10;

SELECT city.name AS City, country.name AS Country, city.population as Population
FROM country country
JOIN city city
ON country.code = city.countryCode
ORDER BY city.population DESC
LIMIT 10;



SELECT SUM(population) AS "Total_Population_of_World"
FROM country