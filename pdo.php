<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
<?php
error_reporting(E_ALL^E_NOTICE^E_WARNING);
	header("Content-Type:text/html;charset=utf-8");
	$mys = 'mysql';
	$user = 'root';
	$pass = 'root';
	$host = 'localhost';
	$dbname = 'han';
	
	$dsn = "$mys:host=$host;dbname=$dbname";
	try{
		$pdo = new PDO($dsn, $user, $pass);
		$query = "select * from song";
		$result = $pdo->prepare($query);
		$result->execute();
		while($res = $result->fetch(PDO::FETCH_ASSOC)){
			var_dump("<br/>".res[id];) 
		}
	}catch(PDOException $e){
		die($e->getMessage()."<br>");
	}
	
?>
<?php
	// header("Content-Type:text/html;charset=utf-8");
	// $dbms='mysql';
	// $dbName='han';
	// $user='root';
	// $pwd='root';
	// $host='localhost';
	// $dsn="$dbms:host=$host;dbname=$dbName";
	// try{
	// 	$pdo=new PDO($dsn,$user,$pwd);
	// 	echo "PDO连接数据库成功";
	// }catch(Exception $e){
	// 	echo $e->getMessage();
	// }
?>
</body>
</html>