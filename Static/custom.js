// $(document).ready( () => {
//     console.log('Document Loaded')
//     $("form").on('submit', (event)=>{
//         console.log(event)
//         console.log("Comment form submits")
//         event.preventDefault()
//         let comment = {
//             postId: event.currentTarget.id,
//             body: $( "#" + event.currentTarget.id + " .postcomment" ).val()
//         }
//         console.log(comment)
//         $.post("/comment", comment, (data) => {
//                 $('.commentss').append( '<p>' + data.comment +'</p>')
//                 $('#postcomment').val('')
//         })
//     })
// })
 // $(document).ready(function(){
 //      $('.submitbutton').click(function(event){
 //        if($('#email').val().trim().length === 0 || $('#password').val().trim().length ===0){
 //          event.preventDefault();
 //          $('#error-message').html("Your username or password is empty");
          
 //        }
 //      });
 //      });

 // $(document).ready(function(){
 //        $('.container').hide();
 //          $('.addpost').click(function(event){
 //              event.preventDefault();
 //              $('.container').show()
              
 //            })
 //           });