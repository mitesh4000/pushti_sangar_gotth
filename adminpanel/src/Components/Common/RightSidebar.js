import React, { useEffect, useState } from 'react';
import {
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody,
    Collapse,
} from "reactstrap";
import withRouter from '../Common/withRouter';

//redux
import {
    changeLayout,
    changeSidebarTheme,
    changeLayoutMode,
    changeLayoutWidth,
    changeLayoutPosition,
    changeTopbarTheme,
    changeLeftsidebarSizeType,
    changeLeftsidebarViewType,
    changeSidebarImageType,
    changePreLoader
    // resetValue
} from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";

//import Constant
import {
    layoutTypes,
    leftSidebarTypes,
    layoutModeTypes,
    layoutWidthTypes,
    layoutPositionTypes,
    topbarThemeTypes,
    leftsidbarSizeTypes,
    leftSidebarViewTypes,
    leftSidebarImageTypes,
    preloaderTypes
} from "../constants/layout";

//SimpleBar
import SimpleBar from "simplebar-react";
import classnames from "classnames";

//import Images
import img01 from "../../assets/images/sidebar/img-1.jpg";
import img02 from "../../assets/images/sidebar/img-2.jpg";
import img03 from "../../assets/images/sidebar/img-3.jpg";
import img04 from "../../assets/images/sidebar/img-4.jpg";

const RightSidebar = (props) => {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    function tog_show() {
        setShow(!show)
        dispatch(changeSidebarTheme("gradient"));
    }

    useEffect(() => {
        if (show && document.getElementById("sidebar-color-dark") && document.getElementById("sidebar-color-light")) {
            document.getElementById("sidebar-color-dark").checked = false;
            document.getElementById("sidebar-color-light").checked = false;
        }
    })

    const {
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftsidbarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
        preloader
    } = useSelector(state => ({
        layoutType: state.Layout.layoutType,
        leftSidebarType: state.Layout.leftSidebarType,
        layoutModeType: state.Layout.layoutModeType,
        layoutWidthType: state.Layout.layoutWidthType,
        layoutPositionType: state.Layout.layoutPositionType,
        topbarThemeType: state.Layout.topbarThemeType,
        leftsidbarSizeType: state.Layout.leftsidbarSizeType,
        leftSidebarViewType: state.Layout.leftSidebarViewType,
        leftSidebarImageType: state.Layout.leftSidebarImageType,
        preloader: state.Layout.preloader
    }));

    // open offcanvas
    const [open, setOpen] = useState(false);
    const toggleLeftCanvas = () => {
        setOpen(!open);
    };

    window.onscroll = function () {
        scrollFunction();
    };

    const scrollFunction = () => {
        const element = document.getElementById("back-to-top");
        if (element) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }
    };

    const toTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };


    const pathName = props.router.location.pathname;

    useEffect(() => {
        const preloader = document.getElementById("preloader");
        if (preloader) {
            document.getElementById("preloader").style.opacity = "1";
            document.getElementById("preloader").style.visibility = "visible";
            setTimeout(function () {
                document.getElementById("preloader").style.opacity = "0";
                document.getElementById("preloader").style.visibility = "hidden";
            }, 1000);
        }
    }, [preloader, pathName]);

    return (
        <React.Fragment>
            

            
        </React.Fragment>
    );
};

export default withRouter(RightSidebar);