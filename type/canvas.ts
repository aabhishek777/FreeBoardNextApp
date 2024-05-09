export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
};

export enum LayerTypes {
  Rectangle,
  Ellips,
  Path,
  Text,
  Note,
}

export type RectangleLayer = {
  type: LayerTypes.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  value?: string;
  fill: Color;
};
export type EllipsLayer = {
  type: LayerTypes.Ellips;
  x: number;
  y: number;
  height: number;
  width: number;
  value?: string;
  fill: Color;
};
export type PathLayer = {
  type: LayerTypes.Path;
  x: number;
  y: number;
  height: number;
  width: number;
  value?: string;
  fill: Color;
  points: number[][];
};
export type TextLayer = {
  type: LayerTypes.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  value?: string;
  fill: Color;
};
export type NoteLayer = {
  type: LayerTypes.Note;
  x: number;
  y: number;
  height: number;
  width: number;
  value?: string;
  fill: Color;
};

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  Height: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
    mode: CanvasMode.Pressing;
    origin: Point;
    }
  | {
      mode: CanvasMode.Translating;
      origin: Point;
    }
  | {
      mode: CanvasMode.SelectionNet;
      origin: Point;
      currunt?: Point;
    }
  | {
      mode: CanvasMode.Inserting;
      layerType:
        | LayerTypes.Ellips
        | LayerTypes.Rectangle
        | LayerTypes.Note
        | LayerTypes.Text;
    }
  | {
    mode: CanvasMode.Resizing;
    intialBound: XYWH;
    corner: Side;
    }
  | {
      mode: CanvasMode.Pencil;
    };

export enum CanvasMode {
  None,
  Pressing,
  Translating,
  SelectionNet,
  Inserting,
  Resizing,
  Pencil,
}
