import React from 'react';
import { shallow, mount } from 'enzyme';
import  CreateFormDefault, { Create } from '../components/create/Create';
import { addRecipe } from '../actions/actions';
import { useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('<Create /> Mounted', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Create />);
    });
    it('renders a form', () => {
        expect(wrapper.find('form')).toHaveLength(1);
    });
    it('renders a label that says: Title', () => {
        expect(wrapper.find('label').at(0).text()).toEqual('Title:');
    });
    it('renders a label that says: Summary', () => {
        expect(wrapper.find('label').at(1).text()).toEqual('Summary:');
    });
    it('renders a label that says: spoonacularScore:', () => {
        expect(wrapper.find('label').at(2).text()).toEqual('spoonacularScore:');
    });
    it('renders a label that says: health Score:', () => {
        expect(wrapper.find('label').at(3).text()).toEqual('health Score:');
    });
    it('renders a label that says Recipe Instructions:', () => {
        expect(wrapper.find('label').at(4).text()).toEqual('Instructions:');
    });
    it('renders a label that says Diets:', () => {
        expect(wrapper.find('label').at(5).text()).toEqual('Diets:');
    });
    it('renders a textarea with name: summary and type: text', () => {
        expect(wrapper.find('textarea[name="summary"]')).toHaveLength(1);
        // expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    });
    it('renders a textarea with name: instructions', () => {
        expect(wrapper.find('textarea[name="instructions"]')).toHaveLength(1);
        // expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    });
    it('renders an input with name: title and type: text', () => {
        expect(wrapper.find('input[name="title"]')).toHaveLength(1);
        expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    });
    it('renders an input with name: spoonacularScore and type: number', () => {
        expect(wrapper.find('input[name="spoonacularScore"]')).toHaveLength(1);
        expect(wrapper.find('input[type="number"]')).toHaveLength(1);
    });
    it('renders an input with name: healthScore and type: number', () => {
        expect(wrapper.find('input[name="healthScore"]')).toHaveLength(1);
        expect(wrapper.find('input[type="number"]')).toHaveLength(1);
    });
    it('renders an input with name: {d.name} and type: checkbox', () => {
        expect(wrapper.find('input[name={d.name}]')).toHaveLength(1);
        expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
    });
    it('renders a button with type: submit', () => {
        expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
    });
    describe('Controlled form', () => {
        let wrapper, useState, useStateSpy;
        beforeEach(() => {
            useState = jest.fn();
            useStateSpy = jest.spyOn(React, 'useState')
            useStateSpy.mockImplementation((init) => [init, useState]);
            wrapper = shallow(<Create />)
        })
        describe('title input', () => {
            it('should change input state when title input is modified', () => {
                wrapper.find('input[name="title"]').simulate('change', {target: {name: 'title', value: 'Potatos'}})
                expect(useState).toHaveBeenCalledWith({"title": "Potatos", "summary": "", "spoonacularScore":"", "healthScore": "", "instructions": "", "diets":""})
            })
        })
        describe('spoonacularScore input', () => {
            it('should change input state when spoonacularScore input is modified', () => {
                wrapper.find('input[name="spoonacularScore"]').simulate('change', {target: {name: 'spoonacularScore', value: "5"}})
                expect(useState).toHaveBeenCalledWith({"title": "Potatos", "summary": "Potato chips", "spoonacularScore":"23", "healthScore": "", "instructions": "", "diets":""})
            })
        })
        describe('healthScore input', () => {
            it('should change input state when healthScore input is modified', () => {
                wrapper.find('input[name="healthScore"]').simulate('change', {target: {name: 'healthScore', value: '34'}})
                expect(useState).toHaveBeenCalledWith({"title": "Potatos", "summary": "", "spoonacularScore":"", "healthScore": "31", "instructions": "", "diets":""})
            })
        })
        // describe('diets input', () => {
        //     it('should change input state when diets input is modified', () => {
        //         wrapper.find('input[name="diets"]').simulate('change', {target: {name: 'diets', value: 'Potatos'}})
        //         expect(useState).toHaveBeenCalledWith({"title": "Potatos", "summary": "", "spoonacularScore":"", "healthScore": "31", "instructions": "", "diets":"gluten free, vegan"})
        //     })
        // })
        describe('description input', () => {
            it('should change input state when summary textarea is modified', () => {
                wrapper.find('textarea[name="description"]').simulate('change', {target: {name: 'summary', value: 'potato chips'}})
                expect(useState).toHaveBeenCalledWith({"title": "", "summary": "potato chips", "spoonacularScore": "", "healthScore": "", "instructions": "", "diets": ""});
            });
        })
        describe('description input', () => {
            it('should change input state when instructions textaerea is modified', () => {
                wrapper.find('textarea[name="instructions"]').simulate('change', {target: {name: 'instructions', value: 'potato chips'}})
                expect(useState).toHaveBeenCalledWith({"title": "", "summary": "potato chips", "spoonacularScore": "", "healthScore": "", "instructions": "fry the potatos in a pan", "diets": ""});
            });
        })
    })
    describe('Dispatch to store', () => {
        var wrapper;
        var store;
        beforeEach(() => {
            const mockStore = configureStore();
            store = mockStore({}, addRecipe);
            store.clearActions();
            wrapper = mount(<CreateFormDefault store={store}/>);
        });
        it('it should dispatch action "addRecipe" with the input state as payload when submitted', () => {
            wrapper = mount(<CreateFormDefault store={store} />);
            wrapper.find('[type="submit"]').simulate('submit', { preventDefault () {} });
            const expectedAction = {
                payload: {
                title: '',
                description: '',
                spoonacularScore: '',
                healthScore: '',
                instructions: '',
                diets: '',
                },
                type: 'ADD_RECIPE'
            }
            expect(store.getActions()).toEqual(expectedAction)
        });
        it('it should call event "preventDefault()"', () => {
            wrapper = mount(<CreateFormDefault store={store} />);
            const event = { preventDefault: () => {} }
            jest.spyOn(event, 'preventDefault');
            wrapper.find('form').simulate('submit', event);
            expect(event.preventDefault).toBeCalled();
        });
    });

})
