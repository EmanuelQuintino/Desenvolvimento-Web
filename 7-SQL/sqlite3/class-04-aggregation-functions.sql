SELECT * FROM orders;
SELECT * FROM orders ORDER BY pais DESC;

SELECT DISTINCT pais FROM orders ORDER BY pais;
SELECT DISTINCT categoria FROM orders ORDER BY categoria;

SELECT * FROM orders WHERE regiao LIKE 'cal%';
SELECT * FROM orders WHERE regiao LIKE '%nia';
SELECT * FROM orders WHERE regiao LIKE '_a%';

SELECT * FROM orders 
WHERE regiao IN ('Bahia', 'Ceará')
ORDER BY regiao;

SELECT * FROM orders 
WHERE total_vendas >= 2000 AND total_vendas <= 3000 
ORDER BY total_vendas;

SELECT * FROM orders 
WHERE quantidade BETWEEN 10 AND 20 
ORDER BY quantidade;

-- aggregation-functions

SELECT 
    COUNT(*) AS QTD, 
    TOTAL(total_vendas),
    SUM(total_vendas) AS Total_Vendas, 
    MIN(total_vendas) AS MIN, 
    MAX(total_vendas) AS MAX, 
    AVG(total_vendas) AS AVG, 
    SQRT(SUM((total_vendas - (SELECT AVG(total_vendas) FROM orders)) * 
             (total_vendas - (SELECT AVG(total_vendas) FROM orders))) / 
              COUNT(total_vendas)) 
              AS Desvio_Padrao_Total_Vendas

FROM orders 
WHERE pais = 'Brazil' 
AND total_vendas > 3000;

SELECT COUNT(*) FROM orders;
SELECT COUNT(DISTINCT pais) FROM orders;
SELECT COUNT(DISTINCT regiao) FROM orders;

SELECT pais, ROUND(SUM(total_vendas)) AS total 
FROM orders 
GROUP BY pais 
ORDER BY total DESC;

SELECT 
    pais, 
    SUM(quantidade), 
    SUM(total_vendas) AS total,  
    AVG(total_vendas) AS AVG
    
FROM orders 
GROUP BY pais 
HAVING total > 700000 
ORDER BY total DESC;
