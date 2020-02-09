<template>
	<div>
		<table>
			<tr>
				<td>编号</td>
				<td>书籍</td>
				<td>作者</td>
			</tr>
			<tr v-for="book in books">
				<td>{{book.id}}</td>
				<td>{{book.name}}</td>
				<td>{{book.author}}</td>
			</tr>
		</table>
		{{message}}
	</div>
</template>

<script>
	export default{
		name:"Book",
		data() {
			return {
				message: "图书管理",
				books:[
					{
						id:1,
						name:"Vue从基础到入门",
						author:"张三"
					},
					{
						id:2,
						name:"Spring技术内幕",
						author:"李四"
					},
					{
						id:3,
						name:"Hbase权威指南",
						author:"王五"
					},
				]
			}
		},
		created() {
			const _this = this;
			axios.get("http://localhost:8081/book/list").then(function (resp) {
				_this.books=resp.data;
			})
		}
	}
</script>

<style>
</style>
