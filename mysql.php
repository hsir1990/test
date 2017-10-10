<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

	<?php
		$link = mysql_connect("localhost","root","root") or die("连接不到服务器的原因".mysql_error());
		if($link){
			echo "连接成功";
		};
		$select = mysql_select_db("hss",$link);
		// $select = mysql_query("hss",$link);
		if($select){
			echo "<br>数据库选择成功<br>";
		};
		$add = mysql_query("insert into song(id,name,age) values(1,11,33)",$link);
		$add2 = mysql_query("insert into song(id,name,age) values(2,22,33)",$link);
		$add4 = mysql_query("insert into song(id,name,age) values(4,21,33)",$link);
		$add3 = mysql_query("insert into song(id,name,age) values(3,22,33)",$link);
		$sou = mysql_query("select * from song where name like '%222%'",$link);
		if($add2){
			echo "插入成功<br>";
		}
		$update = mysql_query("update song set name = '韩松',age = '55' where id=1",$link);
		if($update){
			echo "修改成功<br>";
		}
		$delete = mysql_query("delete from song where id=3",$link);
		if($delete){
			echo "删除成功<br/>";
			print_r($add2);//不打印东西
		}
		$select = mysql_query("select * from song where id=2",$link);
		if($select){
			echo "查找成功<br/>";
	   	}
		$desc = mysql_query("desc song",$link);
		if($desc){
			echo "结果显示成功<br/>";
		}	
		$info = mysql_fetch_array($select);
		print_r($info);//Array ( [0] => 2 [id] => 2 [1] => 22 [name] => 22 [2] => 33 [age] => 33 [3] => [createtime] => ) 
		print_r('<br>'.$info[0]);

		// $infoD = mysql_fetch_array($delete);
		// print_r($infoD);

		//$obj = mysql_fetch_object($select);
		//print_r($obj);//stdClass Object ( [id] => 2 [name] => 22 [age] => 33 [createtime] => )

		//$row = mysql_fetch_row($select);
		//print_r($row);//Array ( [0] => 2 [1] => 22 [2] => 33 [3] => )

		$so = mysql_fetch_object($sou);
		echo '<br>';
		var_dump($so);
		echo '<br>';
		//print_r($so->id);

		$nums = mysql_num_rows($select);
		echo $nums;

	?>
</body>
</html>