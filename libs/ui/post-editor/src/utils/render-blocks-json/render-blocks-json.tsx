import { delimetersMapping, getValueType } from './helpers';
import {
  type Color,
  Container,
  Item,
  Value,
} from './render-blocks-json.styles';

export const RenderBlocksJSON = ({
  obj,
  color = 'neutral',
  level = 0,
}: {
  obj: any;
  color?: Color;
  level?: number;
}) => {
  if (Array.isArray(obj)) {
    return (
      <Container>
        {obj.map((item, index) => (
          <Item key={index}>
            <RenderBlocksJSON obj={item} level={level + 1} />
            {index < obj.length - 1 ? ',' : ''}
          </Item>
        ))}
      </Container>
    );
  } else if (typeof obj === 'object' && obj !== null) {
    return (
      <Container>
        {Object.entries(obj).map(([key, value]) => {
          const typeOfValue = getValueType(value);
          const delimeters = delimetersMapping[typeOfValue];

          const color =
            key === 'type' ? 'primary' : key === 'id' ? 'secondary' : 'neutral';

          return (
            <Item
              key={key}
              {...(level === 1 && {
                onMouseEnter: () => {
                  const block = document.querySelector(
                    `[data-block-id="${key}"]`
                  );

                  if (!block) return;

                  block.classList.add('hover');
                },
              })}
            >
              {key}: {delimeters[0]}
              <RenderBlocksJSON
                obj={typeOfValue === 'file' ? 'File' : value}
                color={color}
                level={level + 1}
              />
              {delimeters[1]} ,
            </Item>
          );
        })}
      </Container>
    );
  } else {
    return <Value $color={color}>{obj}</Value>;
  }
};
