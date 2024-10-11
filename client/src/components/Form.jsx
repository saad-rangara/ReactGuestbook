export default function form(){
    // need state to save the formValues
    //! no need to use useEffect here
    // submit handler
    function handleSubmit(){
        //something to prevent the default form submit
        //something to fetch the POST endpoint in the server
        //fetch("url",{
        // method: "POST",
        // body: formValues,
        // headers: {
        //     "content-type": "application.json"
        // }
        // })
        //we also need to handle the response
    }
    return(
        <>
        <h1>User Data</h1>
        <form action="">
            {/* need to track the changes in the input of our form */}
            {/* need a submit handler */}
        </form>
        </>
    )
}