import helpers from './helpers.js';

window.addEventListener( 'load', () => {
    //When the chat icon is clicked
    document.querySelector( '#toggle-chat-pane' ).addEventListener( 'click', ( e ) => {
        let chatElem = document.querySelector( '#chat-pane' );
        let mainSecElem = document.querySelector( '#main-section' );

        if ( chatElem.classList.contains( 'chat-opened' ) ) {
            chatElem.setAttribute( 'hidden', true );
            mainSecElem.classList.remove( 'col-md-9' );
            mainSecElem.classList.add( 'col-md-12' );
            chatElem.classList.remove( 'chat-opened' );
        }

        else {
            chatElem.attributes.removeNamedItem( 'hidden' );
            mainSecElem.classList.remove( 'col-md-12' );
            mainSecElem.classList.add( 'col-md-9' );
            chatElem.classList.add( 'chat-opened' );
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout( () => {
            if ( document.querySelector( '#chat-pane' ).classList.contains( 'chat-opened' ) ) {
                helpers.toggleChatNotificationBadge();
            }
        }, 300 );
    } );


    //When the video frame is clicked. This will enable picture-in-picture
    /*document.getElementById( 'local' ).addEventListener( 'click', () => {
        if ( !document.pictureInPictureElement ) {
            document.getElementById( 'local' ).requestPictureInPicture()
                .catch( error => {
                    // Video failed to enter Picture-in-Picture mode.
                    console.error( error );
                } );
        }

        else {
            document.exitPictureInPicture()
                .catch( error => {
                    // Video failed to leave Picture-in-Picture mode.
                    console.error( error );
                } );
        }
    } );*/


    //When the 'Create room" is button is clicked
    document.getElementById( 'create-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let roomName = document.querySelector( '#room-name' ).value;
        let yourName = document.querySelector( '#your-name' ).value;

        if ( roomName && yourName ) {
            //remove error message, if any
            document.querySelector('#err-msg').innerText = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', yourName );

            localStorage.setItem("username",yourName);
            localStorage.setItem("roomname",roomName);
            //localStorage.setItem("roomCode", roomCode);

            //create room link
            let roomCode = helpers.generateRandomString()[0];
            let roomLink = `${ location.origin }/index.html?room=${ roomName.trim().replace( ' ', '_' ) }_${roomCode};`
            localStorage.setItem("roomCode", roomCode);
            //show message with link to room
            document.querySelector( '#room-created' ).innerHTML = `
            <div class="alert alert-success fade show text-center" role="alert">
                <strong><h3>Room created succesfully!!</h3></strong>
                <p>Click <a href='${ roomLink }'>here</a> to enter room.</p>
            </div> 
                <div class="copy-to-clipboard-container">
                    <div class="copy-to-clipboard-label">
                        Joining Link
                    </div>
                    <div class="copy-to-clipboard-text">
                        <input type="text" id="text" value=${roomLink} />
                        <button id="copy-text-btn"><i class="fa fa-solid fa-clone"></i></button>
                    </div>
                </div>`;

            //empty the values
            document.querySelector( '#room-name' ).value = '';
            document.querySelector( '#your-name' ).value = '';

            let copyLinkInput = document.querySelector("#text")
            document.querySelector("#copy-text-btn").addEventListener("click", function () {
                copyLinkInput.select();
                navigator.clipboard.writeText(copyLinkInput.value);
                alert("Text Copied")
            })
        }

        else {
            document.querySelector('#err-msg').innerText = "All fields are required";
        }
    } );


    //When the 'Enter room' button is clicked.
    document.getElementById( 'enter-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let name = document.querySelector( '#username' ).value;

        if ( name ) {
            //remove error message, if any
            document.querySelector('#err-msg-username').innerText = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', name );

            //reload room
            location.reload();
        }

        else {
            document.querySelector('#err-msg-username').innerText = "Please input your name";
        }
    } );


    document.addEventListener( 'click', ( e ) => {
        if ( e.target && e.target.classList.contains( 'expand-remote-video' ) ) {
            helpers.maximiseStream( e );
        }

        else if ( e.target && e.target.classList.contains( 'mute-remote-mic' ) ) {
            helpers.singleStreamToggleMute( e );
        }
    } );


    document.getElementById( 'closeModal' ).addEventListener( 'click', () => {
        helpers.toggleModal( 'recording-options-modal', false );
    } );
} );
