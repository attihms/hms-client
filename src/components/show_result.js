let showResults = (value) => new Promise((resolve, reject) => {  
   setTimeout(() => {
   	window.alert(`You have submited: \n\n${Json.stringify(value, null, 2)}`);
   	resolve();
   }, 1000);
});

export default showResults