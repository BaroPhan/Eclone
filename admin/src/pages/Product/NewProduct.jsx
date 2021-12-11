import styled from 'styled-components'

const Container = styled.div`flex: 4;`
const Title = styled.h1``
const Form = styled.form`margin-top: 10px;`
const ProductItem = styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    & > label {
        color: gray;
        font-weight: 600;
        margin-bottom: 10px;
    }
    & > input {padding: 10px;}
    & > select {padding: 10px;}
`
const AddButton = styled.button`
    margin-top: 10px;
    padding: 7px 10px;
    border: none;
    border-radius: 10px;
    background-color: darkblue;
    color: white;
    font-weight: 600;
    cursor: pointer;
`

export const NewProduct = () => {
    return (
        <Container>
            <Title>New Product</Title>
            <Form>
                <ProductItem>
                    <label>Image</label>
                    <input type="file" id="file" />
                </ProductItem>
                <ProductItem>
                    <label>Name</label>
                    <input type="text" placeholder="name" />
                </ProductItem>
                <ProductItem>
                    <label>Description</label>
                    <input type="text" placeholder="desc" />
                </ProductItem>
                <ProductItem>
                    <label>Categories</label>
                    <input type="text" placeholder="jeans, skirt..." />
                </ProductItem>
                <ProductItem>
                    <label>Price</label>
                    <input type="number" placeholder="price" />
                </ProductItem>
                <ProductItem>
                    <label>Stock</label>
                    <select name="active" id="active">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </ProductItem>
                <AddButton>Create</AddButton>
            </Form>
        </Container>
    )
}
