import React from "react";
import {
  Btn,
  Icon,
  Container,
  Chip,
  Dropdown,
  MainTitle,
  Subtitle,
  Avatar,
  Pagination,
} from "components/UI";

const ComponentsPage = () => {
  return (
    <>
      <Container>
        <h1>UI Components Showcase</h1>
        <p>This content is wrapped in a responsive container.</p>

        <section>
          <h2>Buttons</h2>
          <div style={{ display: "flex", gap: "12px" }}>
            <Btn>main</Btn>
            <Btn variant="main" disabled={true}>
              disabled
            </Btn>
            <Btn variant="outlined">outlined</Btn>
            <Btn variant="secondary">singin</Btn>
            <Btn variant="btn-icon">
              <Icon name="icon-star" size="18" color="#050505" />
            </Btn>
            <Btn variant="btn-icon-sm">
              <Icon name="icon-star" size="16" color="#050505" />
            </Btn>

            <Btn variant="outlined">
              Add ingredient
              <Icon name="icon-star" size="18" color="#050505" />
            </Btn>
          </div>
        </section>
        <section>
          <h2>Other</h2>
          <div style={{ display: "flex", gap: "12px" }}>
            <Avatar placeholder="Avatar">
              <span>Avatar</span>
            </Avatar>
            <Icon className="icon" name="icon-star" size="20" color="#050505" />
            <Chip label="chip" />
            <Dropdown
              options={[
                {
                  value: 1,
                  label: "apple",
                },
                {
                  value: 2,
                  label: "banana",
                },
                {
                  value: 3,
                  label: "mango",
                },
              ]}
              value={{
                value: 1,
                label: "apple",
              }}
              placeholder="Choose category"
              onChange={() => false}
            />
          </div>
          <div>
            <MainTitle>MainTitle</MainTitle>
            <Subtitle>Subtitle</Subtitle>
          </div>
          <Pagination total={5} current={2} />
        </section>
      </Container>
    </>
  );
};

export default ComponentsPage;
