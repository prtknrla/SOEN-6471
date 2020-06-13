doctype html
html
  head
    title Signup Page
    style.
      form {
      /* Center the form on the page */
      margin: 0 auto;
      width: 400px;
      /* Form outline */
      padding: 1em;
      border: 1px solid #CCC;
      border-radius: 1em;
      }
      ul {
      list-style: none;
      padding: 0;
      margin: 0;
      }
      form li + li {
      margin-top: 1em;
      }
      label {
      /* Uniform size & alignment */
      display: inline-block;
      width: 90px;
      text-align: right;
      }
      input,
      textarea {
      /* To make sure that all text fields have the same font settings
      By default, textareas have a monospace font */
      font: 1em sans-serif;
      /* Uniform text field size */
      width: 300px;
      box-sizing: border-box;
      /* Match form field borders */
      border: 1px solid #999;
      }
      input:focus,
      textarea:focus {
      /* Additional highlight for focused elements */
      border-color: #000;
      }
      textarea {
      /* Align multiline text fields with their labels */
      vertical-align: top;
      /* Provide space to type some text */
      height: 5em;
      }
      button {
      /* Align buttons with the text fields */
      padding-left: 90px; /* same size as the label elements */
      }
      button {
      /* This extra margin represent roughly the same space as the space
      between the labels and their text fields */
      margin-left: .5em;
      }
  body
    p  
    form(action='/signup', method='post')
      ul
        li
          label(for='id') User ID:
          | &#x9;
          input#id(type='text', name='id')
        |     
        li
          label(for='password') PASSWORD:
          | &#x9;
          input#password(type='text', name='password')
        |       
        li
          label(for='role') Role:
          | &#x9;
          input#role(type='text', name='role')
        |   
        |   
        li.button
          button(type='submit') SUBMIT

