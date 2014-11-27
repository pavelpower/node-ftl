<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=8" />
    <meta name="Author" content="CTI" />
	<meta name="viewport" content="width=1280" />

    <title id="page-title">Node FTL</title>

</head>

<body>
 <h1>Test ftl builder</h1>

 <#if (RequestParameters.optjs) == "true" >
      <h2>Param optjs is enabled</h2>
 </#if>
 <#if (RequestParameters.ie) == "1" >
      <h2>Param ie is enabled</h2>
 </#if>
</body>

</html>