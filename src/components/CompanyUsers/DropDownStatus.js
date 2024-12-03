import {
    Dropdown,
    Form
  } from "react-bootstrap";


const  DropDownStatus = ({item,updateUserStatus,deleteUser,EditUser}) =>{
    return (
        <Dropdown className="action_dropdown">
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          className="btn-transpant"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99984 10.8333C10.4601 10.8333 10.8332 10.4602 10.8332 9.99992C10.8332 9.53968 10.4601 9.16659 9.99984 9.16659C9.5396 9.16659 9.1665 9.53968 9.1665 9.99992C9.1665 10.4602 9.5396 10.8333 9.99984 10.8333Z"
              stroke="#475467"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.99984 4.99992C10.4601 4.99992 10.8332 4.62682 10.8332 4.16659C10.8332 3.70635 10.4601 3.33325 9.99984 3.33325C9.5396 3.33325 9.1665 3.70635 9.1665 4.16659C9.1665 4.62682 9.5396 4.99992 9.99984 4.99992Z"
              stroke="#475467"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.99984 16.6666C10.4601 16.6666 10.8332 16.2935 10.8332 15.8333C10.8332 15.373 10.4601 14.9999 9.99984 14.9999C9.5396 14.9999 9.1665 15.373 9.1665 15.8333C9.1665 16.2935 9.5396 16.6666 9.99984 16.6666Z"
              stroke="#475467"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Dropdown.Toggle>
        

        <Dropdown.Menu>
          {/* Show actions based on the user's status */}
          {item.status === "pending" && (
            <>
              <Dropdown.Item
                href="#/action-1"
                onClick={() => updateUserStatus(item.uid, "Activate")}
              >
                Activate
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-2"
                onClick={() => updateUserStatus(item.uid, "Deactivate")}
              >
                Deactivate
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-3"
                onClick={() => updateUserStatus(item.uid, "Unlock")}
              >
                Unlock
              </Dropdown.Item>
            </>
          )}

          {/* Option for active users */}
          {item.status === "Logged-in" && (
            <Dropdown.Item
              href="#/action-4"
              onClick={() => updateUserStatus(item.uid, "Deactivate")}
            >
              Deactivate
            </Dropdown.Item>
          )}

          {/* Option for deactivated users */}
          {item.status === "Logged-out-Inactive" && (
            <>
              <Dropdown.Item
                href="#/action-5"
                onClick={() => updateUserStatus(item.uid, "Activate")}
              >
                Activate
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-5"
                onClick={() => updateUserStatus(item.uid, "Deactivated")}
              >
                Deactivated
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-5"
                onClick={() => updateUserStatus(item.uid, "Unlock")}
              >
                Unlock
              </Dropdown.Item>
            </>
          )}
          {item.status === "Logged-out-active" && (
            <>
              
              <Dropdown.Item
                href="#/action-5"
                onClick={() => updateUserStatus(item.uid, "Deactivated")}
              >
                Deactivated
              </Dropdown.Item>
         
            </>
          )}

          {/* Common action to delete the user */}
          <Dropdown.Item
            href="#/action-6"
            onClick={() => deleteUser([item.uid])}
          >
            Delete
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-2"
            onClick={() => EditUser([item.uid])}
          >
            Save Edit Changes
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
}

export default DropDownStatus