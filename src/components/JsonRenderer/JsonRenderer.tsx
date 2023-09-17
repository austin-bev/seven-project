import React, { Component, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./JsonRenderer.css";

interface Intention {
  kind: string;
  index: number;
  length: number;
}

interface TextBlock {
  kind: string;
  text: string;
  intentions: Intention[] | [];
}

interface ImageBlock {
  kind: string;
  captionText: string;
  url: string;
}

interface QuoteBlock {
  kind: string;
  text: string;
  attribution: string;
}

type Block = ImageBlock | TextBlock | QuoteBlock;

interface Article {
  headline: string;
  byline: string;
  source: string;
  publicationDate: string;
  blocks: Block[];
}

interface JsonRendererState {
  data: Article | null;
}

function isTextBlock(block: Block): block is TextBlock {
  return block.kind === "text";
}

function isImageBlock(block: Block): block is ImageBlock {
  return block.kind === "image";
}

function isQuoteBlock(block: Block): block is QuoteBlock {
  return block.kind === "pull-quote";
}

function formatDate(date: Date) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek: string = daysOfWeek[date.getDay()];
  const dayOfMonth: number = date.getDate();
  const month: string = months[date.getMonth()];
  const year: number = date.getFullYear();
  const hours: string = date
    .getHours()
    .toLocaleString("en-US", { minimumIntegerDigits: 2 });
  const minutes: string = date
    .getMinutes()
    .toLocaleString("en-US", { minimumIntegerDigits: 2 });

  const amOrPm: string = parseInt(hours) >= 12 ? "PM" : "AM";

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year} ${hours}:${minutes}${amOrPm}`;
  return formattedDate;
}

function formatText(text: string, intention: Intention) {
  switch (intention.kind) {
    case "important":
      return <b>{text}</b>;
    case "emphasized":
      return <em>{text}</em>;
    case "underline":
      return <u>{text}</u>;
    default:
      return text;
  }
}

class JsonRenderer extends Component<
  { toggleTheme: () => void; theme: string; fileContents: string | null },
  JsonRendererState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const { toggleTheme, theme, fileContents } = this.props;
    if (fileContents === null) {
      fetch(process.env.PUBLIC_URL + "/article.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => this.setState({ data }))
        .catch((error) => console.error("Error:", error));
    } else {
      try {
        const jsonData = JSON.parse(fileContents);
        this.setState({ data: jsonData });
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }

  render() {
    console.log(this.state);
    const { data } = this.state;

    if (!data) {
      return <div>Loading...</div>;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <a
          className="theme-toggle custom-button"
          onClick={this.props.toggleTheme}
        >
          Toggle Dark Mode
        </a>
        <div className="article">
          {/* Header */}
          <div className="header">
            <p className="headline">{data.headline}</p>
            <p>
              <b>{data.byline}</b>, <em>{data.source}</em>
            </p>
            <div className="date-container">
              <p>{formatDate(new Date(data.publicationDate))}</p>
              <img
                className="plus-logo"
                src={process.env.PUBLIC_URL + "/plus.svg"}
              />
            </div>
          </div>
          <hr />
          {/* Body */}
          {data.blocks.map((block, index) => (
            <div className="block" key={index}>
              {/* Text Blocks */}
              {isTextBlock(block) && (
                <p>
                  {block.intentions.map((intention, i) => {
                    //Find where the previous intention ended
                    const textBeforeIndex =
                      i === 0
                        ? 0
                        : block.intentions[i - 1].index +
                          block.intentions[i - 1].length;
                    //Use that to find all text before intention
                    const textBefore = block.text.slice(
                      textBeforeIndex,
                      intention.index,
                    );
                    const emphasizedText = block.text.slice(
                      intention.index,
                      intention.index + intention.length,
                    );
                    return (
                      <React.Fragment key={i}>
                        {textBefore}
                        {formatText(emphasizedText, intention)}
                      </React.Fragment>
                    );
                  })}
                  {block.text.slice(
                    //Non-emphasised text
                    block.intentions.length === 0
                      ? 0
                      : block.intentions[block.intentions.length - 1].index +
                          block.intentions[block.intentions.length - 1].length,
                  )}
                </p>
              )}
              {/* Image Blocks */}
              {isImageBlock(block) && (
                <div className="container">
                  <img src={block.url} alt={block.captionText} />
                  <p>{block.captionText}</p>
                </div>
              )}
              {/* Quote Blocks */}
              {isQuoteBlock(block) && (
                <div className="container quote">
                  <p className="quote-text">{block.text}</p>
                  <p className="quote-attribution">{block.attribution}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
}

export default JsonRenderer;
