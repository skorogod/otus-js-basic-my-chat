import { message, messages} from "../modules/redux/reducers/messages";
import { Message } from "../modules/types";
import { store } from "../modules/redux/store";
import { push } from "firebase/database";

function generateRandomString(length:number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


beforeEach(() => {
    jest.clearAllMocks();
})


describe("message reducer", () => {
        test(`message reducer returns new state when action
            " with action type ADD MESSAGE dispathing`, () => {
                const state = store.getState();
                let newState
                newState = message(state, {type: 'FETCH_MESSAGE'})
                expect(state).toEqual(newState);
                
                const msg: Message = {
                    id: "fkngekgmgjg39jg",
                    text: 'test',
                    dateTime: 1234567
                }
                const action = {type: "ADD_MESSAGE", payload: msg }
                newState = message(state, action)
                expect(state).not.toEqual(newState);
            }
        )
})

describe("messages reducer", () => {
    test(`messages reducer add new message object to state 
            if action.type is ADD_MESSAGE and this message object is not in state
            `, () => {
                let state = store.getState();
                const messages: Message[] = []

                for(let i=0; i<5; i++) {
                    messages.push(
                        {
                            id: generateRandomString(6),
                            text: generateRandomString(10),
                            dateTime: Date.now()
                        }
                    )
                }

                
            })
})