--- Scenario: if for a specific order we have 3 different campaigns and 1 campaign can have multiple ordersin it.
--- 1. Create the query to list the top 3 orders and from which campaign it has been bought and by
---        which user. This will help reduce the cost of campaigns and increase revenue.


select * from orders 

JOIN (select DISTINCT total totalDraft from orders  order by total  DESC LIMIT 2, 1 ) x on total >= totalDraft ORDER by total DESC 

inner join users on users.id =  orders.user_id  inner join campaigns on campaigns.id = users.campaingn_id;

--- 2. Create a query to list 3 most revenue generating campaigns.

select * , sum(orders.total) from campaigns inner join users on users.campaingn_id = compaigns.id  
inner join orders on orders.user_id = users.id GROUP by compaigns.id  order by orders.total DESC LIMIT 3;