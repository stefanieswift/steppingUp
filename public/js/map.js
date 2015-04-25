<div id="form">
    <form id="calculate-route" name="calculate-route" action="#" method="get">
        <label>First address: </label>
        <input type="text" name="address1" id="from" size="50"/>
        <a id="from-link" href="#">Get my position</a>
         <label>Second address: </label>
         <input type="text" name="address2" id="to" size="50"/>
         <a id="to-link" href="#">Get my position</a>
         <label>Step Count: </label>
         <input type="integer" name="steps" id="steps" size="10"/>
        <input type="button" id="submit" value="Show"  onclick="initialize();"/>
        </form>
    </div>