import styled from 'styled-components'



export const ImagePreview = styled.div`
    position: relative;
    /* cursor: pointer; */
    #uploaded-image{
        height: 350px;
        width: 350px;
        object-fit: cover;
        border-radius: 20px;
    }
    .close-icon{
        background: #000;
        border-radius: 5px;
        opacity: .8;
        position: absolute;
        z-index: 10;
        right: 15px;
        top: 20px;
        cursor: pointer;
        :hover {
            opacity: 1;
        }   
    }
`