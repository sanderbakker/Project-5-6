import React, { Component } from 'react';
import FAVideo from 'react-icons/lib/fa/video-camera'
import FAUserPlus from 'react-icons/lib/fa/user-plus'
import MdEllipsisMenu from 'react-icons/lib/md/keyboard-control'

export default function({name, numberOfUsers}) {
    return(
        <h5 className="chat-header">
            <div className="user-info">
                <div className="user-name">{name} 
                    <i class="fa fa-user-plus pull-right"></i>                
                </div>
                <div className="status">
                    <div className={`indicator`}></div>
                	<span>{numberOfUsers ? numberOfUsers : null}</span>
                </div>
            </div>
            
        </h5>
    );
} 